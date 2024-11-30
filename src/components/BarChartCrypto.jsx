import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import dayjs from 'dayjs';

export const BarChartCrypto = ({ datos, dias, monedas }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  // const fechas = datos.flatMap((moneda) =>
  //   moneda.map((entrada) => {
  //     const fechaFormateada = dayjs(entrada[0]).format("DD-MM-YYYY");
  //     console.log("Fecha:", fechaFormateada);
  //     return fechaFormateada;
  //   })
  // );

  // // Extraer precios
  // const precios = datos.flatMap((moneda) =>
  //   moneda.map((entrada) => {
  //     const precio = entrada[1];
  //     console.log("Precio:", precio);
  //     return precio;
  //   })
  // );

  useEffect(() => {
    if (!datos || datos.length === 0 || !monedas || monedas.length === 0) { return; } 
    const fechas = datos[0].map((entrada) => dayjs(entrada[0]).format("DD-MM-YYYY")); 
    const datasets = datos.map((moneda, index) => { const precios = moneda.map((entrada) => entrada[1]); 
      return { label: `Precio de ${monedas[index]?.id} en USD`, data: precios, fill: false, 
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 
      ${Math.floor(Math.random() * 255)}, 1)`, tension: 0.4 }; });
    
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const data = { labels: fechas, datasets: datasets };
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
