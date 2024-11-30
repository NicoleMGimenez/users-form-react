import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCryptoData } from '../store/cryptos/crypto.thunks';
import { historyCryptoData } from '../store/cryptos/crypto.thunks';
import { resetHistoryCryptoData } from '../store/cryptos/crypto.slice';
import { CryptosTable } from '../components/CryptosTable';
import { BarChart } from '../components/BarChart';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import { BarChartCrypto } from '../components/BarChartCrypto';
import { CryptoConverter } from '../components/CryptoConverter';
import { MultiSelect } from 'primereact/multiselect';

export const Cryptos = () => {
  const dispatch = useDispatch();
  const cryptos = useSelector((state) => state?.cryptos?.cryptos);
  const cryptosLabels = useSelector((state) => state?.cryptos?.cryptosLabels);
  const cryptosHistory = useSelector((state) => state?.cryptos?.historyCryptoData);
  //const [selectedCoin, setSelectedCoin] = useState(null);
  //const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [selectedCoinsData, setSelectedCoinsData] = useState([]);
  const [selectedLapso, setSelectedLapso] = useState(null);

  const lapso = [{ label: '5 días', value: 5 },
  { label: '10 días', value: 10 },
  { label: '15 días', value: 15 },
  { label: '30 días', value: 30 },];

  useEffect(() => {
    dispatch(getCryptoData());
  }, [dispatch])

  // const filter = () => {
  //   dispatch(historyCryptoData({ coinId: selectedCoin, days: selectedLapso }));
  //   const filteredCoin = cryptos.filter((coin) => coin.id === selectedCoin);
  //   setSelectedCoinData(filteredCoin)
  // }

  const filter = () => {
    dispatch(resetHistoryCryptoData());
    setSelectedCoinsData([]);
    selectedCoins.forEach((coinId) => {
      dispatch(historyCryptoData({ coinId, days: selectedLapso }));
    });
    const filteredCoins = cryptos.filter((coin) => selectedCoins.includes(coin.id));
    setSelectedCoinsData(filteredCoins);
  };

  const clearFilters = () => {
    setSelectedCoins([]);
    setSelectedLapso(null);
    dispatch(resetHistoryCryptoData());
    setSelectedCoinsData([]);
  };

  // const clearFilters = () => {
  //   setSelectedCoin(null);
  //   setSelectedLapso(null);
  //   dispatch(resetHistoryCryptoData());
  //   setSelectedCoinData(null);
  // };

  const capitalizeFirstLetter = (string) => { return string.charAt(0).toUpperCase() + string.slice(1); };
  const transformedOptions = cryptosLabels.map((label) => ({ label: capitalizeFirstLetter(label), value: label, }));  

  return (
    <>
      <div className="cryptosContenedor">
        <TabView>
          <TabPanel header="Cryptos Info" leftIcon="pi pi-info-circle m-2">
            <div className="grid">
              <div className="col-12 md:col-6">
                <div className="flex flex-column md:flex-row">
                  {/* <Dropdown
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.value)}
                    options={transformedOptions}
                    placeholder="Selecciona una moneda"
                    className="w-full m-1"
                    filter
                  /> */}

                  <MultiSelect
                    value={selectedCoins}
                    onChange={(e) => setSelectedCoins(e.value)}
                    options={transformedOptions} optionLabel="label" display="chip"
                    placeholder="Selecciona monedas"
                    maxSelectedLabels={3}
                    className="w-full m-1"
                    filter />

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
                      disabled={!selectedCoins || !selectedLapso}
                    />
                    <Button
                      severity="secondary"
                      icon="pi pi-trash"
                      rounded
                      label='Borrar'
                      onClick={clearFilters}
                      disabled={!selectedCoins || !selectedLapso}
                    />
                  </div>
                </div>
              </div>
            </div>
            <CryptosTable datos={selectedCoinsData.length === 0 ? cryptos : selectedCoinsData}></CryptosTable>
            <br />
            <div hidden={cryptosHistory.length > 0}>
              <BarChart datos={cryptos}></BarChart>
            </div>
            <div hidden={cryptosHistory.length === 0}>
              <BarChartCrypto datos={cryptosHistory} dias={selectedLapso} monedas={selectedCoinsData}></BarChartCrypto>
            </div>
          </TabPanel>
          <TabPanel header="Calcular mi ganancia" leftIcon="pi pi-dollar m-2">
            <CryptoConverter></CryptoConverter>
          </TabPanel>
        </TabView>
      </div>
    </>
  )
}
