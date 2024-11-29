import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import dayjs from 'dayjs';

export const BarChartCrypto = ({ datos, dias }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const fechas = datos.map(
    (moneda) => {
      const monedasDate = dayjs(moneda[0]).format('DD-MM-YYYY');
      return monedasDate;
    }
  );
  console.log(fechas);

  const precios = datos.map(
    (moneda) =>{return moneda[1]}
  )
  console.log(precios);
  

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const data = {
      labels: fechas,
      datasets: [
        {
          label: 'Precio en USD',
          data: precios,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-700'),
          tension: 0.4
        },
      ]
    };
    const options = {
      // maintainAspectRatio: false,
      aspectRatio: 0.6,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, [datos]);

  return (
    <div className="card">
      <h3>Historial en el lapso de {dias} días</h3>
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  )
}
