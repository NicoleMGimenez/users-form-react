import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dateCryptoData } from '../store/cryptos/crypto.thunks';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import dayjs from 'dayjs';
import redarrow from '../assets/redarrow.png';
import greenarrow from '../assets/greenarrow.png';
import '../App.css';

export const CryptoConverter = () => {
  const dispatch = useDispatch();
  const cryptos = useSelector((state) => state?.cryptos?.cryptos);
  const cryptoData = useSelector((state) => state?.cryptos?.dateCryptoData);
  const cryptosLabels = useSelector((state) => state?.cryptos?.cryptosLabels);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [date, setDate] = useState(null);
  const [monto, setMonto] = useState(0);
  const [resultado, setResultado] = useState(0);
  const [resultadoActual, setResultadoActual] = useState(0);
  const [showConverter, setShowConverter] = useState(false);
  let today = new Date();// Fecha actual
  let minDate = new Date();// Calcula 365 días antes
  minDate.setDate(today.getDate() - 365);
  let maxDate = today;// La fecha máxima es el día de hoy

  const [message, setMessage] = useState('');
  const [estado, setEstado] = useState(0);

  const capitalizeFirstLetter = (string) => { return string.charAt(0).toUpperCase() + string.slice(1); };
  const transformedOptions = cryptosLabels.map((label) => ({ label: capitalizeFirstLetter(label), value: label, }));

  const prices = () => {
    const formattedDate = formatDate(date);
    dispatch(dateCryptoData({ coinId: selectedCoin, date: formattedDate }));
    setShowConverter(true);
  };

  const formatDate = (date) => { return dayjs(date).format('DD-MM-YYYY'); };
  const formatedDate = formatDate(today);
  const formatteedDateSelected = formatDate(date);
  const currencyOptions = Object.keys(cryptoData || {}).map((key) => ({ label: key.toUpperCase(), value: key, }));

  const convertir = () => {
    if (cryptoData && selectedCurrency) {
      const conversionRate = cryptoData[selectedCurrency];
      const conversionActual = cryptos.find(coin => coin.id === selectedCoin)?.current_price;
      setResultado(monto * conversionRate);
      setResultadoActual(monto * conversionActual);
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
          setEstado(2)
        } else {
          setMessage(`Perdiste, el precio disminuyó un ${percentageChange.toFixed(2)}%`);
          setEstado(1)
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
                tooltip="Moneda seleccionada" tooltipOptions={{ position: 'top' }}
              />

              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                minDate={minDate}
                maxDate={maxDate}
                readOnlyInput
                showIcon
                className="w-full m-1"
                placeholder="Selecciona la fecha de compra"
                tooltip="Fecha de compra" tooltipOptions={{ position: 'top' }}
              />
              <Button label='Buscar' onClick={prices} icon="pi pi-search" className="custom-button m-1"
                disabled={!selectedCoin || !date} />

              <div>
                <Dropdown disabled={cryptoData === null} value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.value)} options={currencyOptions} filter
                  placeholder="USD" tooltip="Selecciona el tipo de cambio" tooltipOptions={{ position: 'top' }} className="w-full m-1" />
              </div>
            </div>
            <br />

            <div className="grid justify-content-center">
              <div className="col-12 lg:col-6">
                <div hidden={!showConverter}>
                  <div className="card">
                    <Card>
                      <p className="m-0">
                        <span> {cryptoData && `1.00 ${selectedCoin} = $${cryptos.find(coin => coin.id === selectedCoin)?.current_price.toFixed(2)}`} </span>
                        <p style={{ fontWeight: 'lighter', fontSize: '14px' }} >Valor actual de {selectedCoin} el {formatedDate}</p>
                      </p>
                    </Card>
                    <br />
                    <Card>
                      <p className="m-0">
                        <span> {cryptoData && `1.00 ${selectedCoin} = $${cryptoData[selectedCurrency].toFixed(2)}`} </span>
                        <p style={{ fontWeight: 'lighter', fontSize: '14px' }} >Valor de {selectedCoin} el {formatteedDateSelected}</p>
                      </p>
                    </Card>
                  </div>
                </div>

              </div>
              <div className="col-12 lg:col-6 imagenes">
                <div>
                  {
                    estado === 1 && (<img src={redarrow} alt="" style={{ height: '20vh', alignItems: 'center' }} />)
                  }
                  {
                    estado === 2 && (<img src={greenarrow} alt="" style={{ height: '20vh', alignItems: 'center' }} />)
                  }
                  <br />
                  <span>{message}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div hidden={!showConverter}>
        <hr />
        <h2 className='text-center'>Convertidor de moneda</h2>
        <div hidden={!selectedCoin && date === null}>
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
                    tooltip="Ingresa la cantidad de moneda comprada" tooltipOptions={{ position: 'top' }} />
                </div>
                <Button label='Calcular' onClick={convertir} icon="pi pi-calculator" className="custom-button w-full m-1"></Button>
              </div>
            </div>
          </div>
          <div className="col-12 lg:col-8">
            <div className="text-center font-bold">
              <div className="flex flex-column md:flex-row justify-content-center">
                <div className="flex align-items-center w-full m-1">
                  <InputText readOnly className="w-full text-center m-1" value={`Valor anterior: $${resultado.toFixed(2)}`}
                    tooltip="Valor con el tipo de cambio solicitado" tooltipOptions={{ position: 'top' }} style={{backgroundColor: 'whitesmoke'}}/>
                </div>
                <div className="flex align-items-center w-full m-1">
                  <InputText readOnly className="w-full text-center m-1" value={`Valor actual: $${resultadoActual.toFixed(2)}`}
                    tooltip="Valor con el tipo de cambio solicitado" tooltipOptions={{ position: 'top' }} style={{backgroundColor: 'whitesmoke'}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
