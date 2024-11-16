import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';

export const BarChart = ({ datos }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [showCoins, setShowCoins] = useState(5);

  const coins = [5, 10, 25, 50];

  useEffect(() => {
    const labelsFirstFive = datos.slice(0, showCoins);

    const labels = labelsFirstFive.map((moneda) => moneda.name);
    const now = labelsFirstFive.map((moneda) => moneda.current_price);
    const higher = labelsFirstFive.map((moneda) => moneda.ath);
    const lower = labelsFirstFive.map((moneda) => moneda.atl);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Now',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: now,
        },
        {
          label: 'Higher',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          borderColor: documentStyle.getPropertyValue('--green-500'),
          data: higher,
        },
        {
          label: 'Lower',
          backgroundColor: documentStyle.getPropertyValue('--red-500'),
          borderColor: documentStyle.getPropertyValue('--red-500'),
          data: lower,
        },
      ],
    };

    const options = {
      indexAxis: 'y',
      // maintainAspectRatio: false,
      // aspectRatio: 0.8,
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [showCoins, datos]); // Asegúrate de incluir 'datos' en las dependencias

  const ptOptions = { 
    canvas: { 
      style: {
        height: '50vh', 
        weight: '100%'
      }, 
    }, 
  };

  return (
    <div className="card" style={{ backgroundColor: 'whitesmoke' }}>
      {/* <div className="grid">
        <div className="col-10">
          <h2 className='mt-2' style={{ color: '#495057' }}>Historial de valores</h2>
        </div>
        <div className="col">
          <Dropdown value={showCoins} onChange={(e) => setShowCoins(e.value)} options={coins.map((coin) => ({ label: coin, value: coin }))} className="w-full md:w-5rem" />
        </div>
      </div> */}
      <div className="grid">
        <div className="col">
          <div className="text-center border-round-sm font-bold" style={{ color: '#495057' }}>
            <h2>Historial de valores</h2>
          </div>
        </div>
      </div>
      <Chart type="bar" data={chartData} options={chartOptions} pt={ptOptions} />
      <div className="grid">
        <div className="col-fixed" style={{ width: '100px' }}>
          <div className="text-center p-3 border-round-sm font-bold">
            <Dropdown value={showCoins} onChange={(e) => setShowCoins(e.value)} options={coins.map((coin) => ({ label: coin, value: coin }))} className="w-full md:w-5rem" />
          </div>
        </div>
      </div>
    </div>
  );
};
