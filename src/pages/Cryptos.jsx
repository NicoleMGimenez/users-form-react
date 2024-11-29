import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCryptoData } from '../store/cryptos/crypto.thunks';
import { dateCryptoData } from '../store/cryptos/crypto.thunks';
import { historyCryptoData } from '../store/cryptos/crypto.thunks';
import { resetHistoryCryptoData } from '../store/cryptos/crypto.slice';
import { CryptosTable } from '../components/CryptosTable';
import { BarChart } from '../components/BarChart';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import { BarChartCrypto } from '../components/BarChartCrypto';
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';
import dayjs from 'dayjs';
import redarrow from '../assets/redarrow.png';
import greenarrow from '../assets/greenarrow.png';


export const Cryptos = () => {
  const dispatch = useDispatch();
  const cryptos = useSelector((state) => state?.cryptos?.cryptos);
  const cryptoData = useSelector((state) => state?.cryptos?.dateCryptoData);
  const cryptosLabels = useSelector((state) => state?.cryptos?.cryptosLabels);
  const cryptoHistory = useSelector((state) => state?.cryptos?.historyCryptoData);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [selectedLapso, setSelectedLapso] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [date, setDate] = useState(null);
  const [monto, setMonto] = useState(0);
  const [resultado, setResultado] = useState(0);
  let today = new Date();// Fecha actual
  let minDate = new Date();// Calcula 365 días antes
  minDate.setDate(today.getDate() - 365);
  let maxDate = today;// La fecha máxima es el día de hoy

  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('');
  const [estado, setEstado] = useState(0);

  const lapso = [{ label: '5 días', value: 5 },
  { label: '10 días', value: 10 },
  { label: '15 días', value: 15 },
  { label: '30 días', value: 30 },];

  useEffect(() => {
    dispatch(getCryptoData());
  }, [dispatch])

  const filter = () => {
    dispatch(historyCryptoData({ coinId: selectedCoin, days: selectedLapso }));
    const filteredCoin = cryptos.filter((coin) => coin.id === selectedCoin);
    setSelectedCoinData(filteredCoin)
  }

  const clearFilters = () => {
    setSelectedCoin(null);
    setSelectedLapso(null);
    dispatch(resetHistoryCryptoData());
    setSelectedCoinData(null);
  };

  const capitalizeFirstLetter = (string) => { return string.charAt(0).toUpperCase() + string.slice(1); };
  const transformedOptions = cryptosLabels.map((label) => ({ label: capitalizeFirstLetter(label), value: label, }));

  const prices = () => {
    const formattedDate = formatDate(date);
    dispatch(dateCryptoData({ coinId: selectedCoin, date: formattedDate }));
    //comparePrices();
  };

  // const formatDate = (date) => {
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // };
  // const formattedDateCalendar = today.toLocaleDateString('es-ES', {
  //   day: '2-digit',
  //   month: '2-digit',
  //   year: 'numeric',
  // });

  const formatDate = (date) => { return dayjs(date).format('DD-MM-YYYY'); };
  const formattedDateCalendar = formatDate(today);
  const formatteedDateSelected = formatDate(date);
  const currencyOptions = Object.keys(cryptoData || {}).map((key) => ({ label: key.toUpperCase(), value: key, }));

  const convertir = () => {
    if (cryptoData && selectedCurrency) {
      const conversionRate = cryptoData[selectedCurrency];
      setResultado(monto * conversionRate);
    }
  };

  const comparePrices = () => {
    if (cryptoData && selectedCoin) {
      const currentPrice = cryptos
        .filter((coin) => coin.id === selectedCoin)
        .map((coin) => coin.current_price)[0];

      const previousPrice = cryptoData[selectedCurrency];

      if (currentPrice && previousPrice) {
        const percentageChange =
          previousPrice > currentPrice
            ? ((previousPrice - currentPrice) / currentPrice) * 100
            : ((currentPrice - previousPrice) / previousPrice) * 100;

        if (previousPrice < currentPrice) {
          setMessage(`Ganaste, el precio aumentó un ${percentageChange.toFixed(2)}%`);
          setEstado(1)
        } else {
          setMessage(`Perdiste, el precio disminuyó un ${percentageChange.toFixed(2)}%`);
          setEstado(2)
        }
      }
    }
  };

  useEffect(() => {
    comparePrices();
  }, [cryptoData]);

  const msgs = useRef(null);
  useMountEffect(() => {
    if (msgs.current) {
      msgs.current.clear();
      msgs.current.show({ id: '1', sticky: true, severity: 'info', summary: 'Info', detail: 'Para calcular el porcentaje de ganancia de su inversión, seleccione la moneda y la fecha de adquisición. El sistema mostrará inmediatamente el aumento o disminución respecto al valor actual.', closable: false });
    }
  });

  return (
    <>
      <div className="cryptosContenedor">
        <TabView>
          <TabPanel header="Cryptos Info" leftIcon="pi pi-info-circle m-2">
            <div className="grid">
              <div className="col-12 md:col-6">
                <div className="flex flex-column md:flex-row">
                  <Dropdown
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.value)}
                    options={transformedOptions}
                    placeholder="Selecciona una moneda"
                    className="w-full m-1"
                    filter
                  />
                  <Dropdown
                    value={selectedLapso}
                    onChange={(e) => setSelectedLapso(e.value)}
                    options={lapso}
                    placeholder="Selecciona un lapso"
                    className="w-full m-1"
                  />
                  <div className="flex justify-content-center m-1">
                    <Button
                      onClick={filter}
                      severity="secondary"
                      icon="pi pi-filter-fill"
                      rounded
                      className='mr-1'
                      label='Filtrar'
                    />
                    <Button
                      severity="secondary"
                      icon="pi pi-trash"
                      rounded
                      label='Borrar'
                      onClick={clearFilters}
                    />
                  </div>
                </div>
              </div>
            </div>
            <CryptosTable datos={selectedCoinData === null ? cryptos : selectedCoinData}></CryptosTable>
            <br />
            <div hidden={cryptoHistory.length > 0}>
              <BarChart datos={cryptos}></BarChart>
            </div>
            <div hidden={cryptoHistory.length === 0}>
              <BarChartCrypto datos={cryptoHistory} dias={selectedLapso}></BarChartCrypto>
            </div>
          </TabPanel>
          <TabPanel header="Calcular mi ganancia" leftIcon="pi pi-dollar m-2">
            <Messages ref={msgs} />
            <Messages ref={msgs} />
            <h2 className='text-center'>Calculadora de ganancias</h2>
            <div className="grid justify-content-center">
              <div className="col-12 lg:col-6">
                <div className="text-center font-bold">
                  <div className="flex flex-column md:flex-row">
                    <Dropdown
                      value={selectedCoin}
                      onChange={(e) => setSelectedCoin(e.value)}
                      options={transformedOptions}
                      placeholder="Selecciona una moneda"
                      className="w-full m-1"
                      filter
                      tooltip="Selecciona una moneda" tooltipOptions={{ position: 'top' }}
                    />

                    <Calendar
                      value={date}
                      onChange={(e) => setDate(e.value)}
                      minDate={minDate}
                      maxDate={maxDate}
                      readOnlyInput
                      showIcon
                      className="w-full m-1"
                      placeholder={formattedDateCalendar}
                      tooltip="Selecciona la fecha de compra" tooltipOptions={{ position: 'top' }}
                    />
                    <Button onClick={prices} icon="pi pi-arrow-right" className='p-2'
                      style={{ width: '70px', backgroundColor: 'white', color: 'black', borderColor: 'white' }} />

                    <div>
                      <Dropdown disabled={cryptoData === null} value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.value)} options={currencyOptions} filter
                        placeholder="USD" tooltip="Selecciona el tipo de cambio" tooltipOptions={{ position: 'top' }} className="w-full m-1" />
                    </div>
                  </div>
                  <br />
                  <div hidden={cryptoData === null}>
                    <span> {cryptoData && `1.00 ${selectedCoin} = $${cryptoData[selectedCurrency]}`} </span>
                    <p style={{ fontWeight: 'lighter', fontSize: '14px' }} >Valor de {selectedCoin} el {formatteedDateSelected}</p>
                  </div>
                </div>
              </div>
            </div>
            <div hidden={estado == 0 || estado == 1}>
              <img src={redarrow} alt="" style={{ height: '20vh', alignItems: 'center' }} />
            </div>
            <div hidden={estado == 0 || estado == 2}>
              <img src={greenarrow} alt="" style={{ height: '20vh', alignItems: 'center' }} />
            </div>
            <span>{message}</span>
            <br />
            <br />
            <hr />
            <h2 className='text-center'>Convertidor de moneda</h2>
            <div hidden={!selectedCoin}>
              <p style={{ fontWeight: 'normal', fontSize: '14px' }} >Para el valor de {selectedCoin} el {formatteedDateSelected}</p>
            </div>
            <div className="grid grid justify-content-center">
              <div className="col-12 lg:col-8">
                <div className="text-center font-bold">
                  <div className="flex flex-column md:flex-row justify-content-center">
                    <div className="flex align-items-center w-full m-1">
                      <span>$</span>
                      <InputText id="monto" value={monto} onChange={(e) => setMonto(e.target.value)}
                        className="w-full text-center m-1" placeholder="Ingresa monto" type="number" 
                        tooltip="Ingresa la cantidad de moneda comprada" tooltipOptions={{ position: 'top' }}/>
                    </div>
                    <Button onClick={convertir} icon="pi pi-calculator" className='p-2'
                      style={{ width: '20vh', backgroundColor: 'white', color: 'black', borderColor: 'white' }}></Button>
                    <div className="flex align-items-center w-full m-1">
                      <span>$</span>
                      <InputText readOnly type="number" className="w-full text-center m-1" value={resultado} 
                       tooltip="Valor con el tipo de cambio solicitado" tooltipOptions={{ position: 'top' }}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </>
  )
}
