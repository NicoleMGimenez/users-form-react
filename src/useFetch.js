//nomenclatura que se usa cuando se usa un custom hook -> use<<accion a realizar>>
import { useState, useEffect } from "react"; //hooks

export function useFetch(url) {
  //   const [data, setData] = useState(null); //contiene la info y la funcion que setea la info
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   const [controller, setConstroller] = useState(null);


  //   useEffect(() => { //nos va a permitir hacer la peticion http
  //     const abortController = new AbortController();
  //     setConstroller(abortController);
  //     setLoading(true);

  //     fetch(url, { signal: abortController.signal })
  //       .then((res) => res.json())
  //       .then((data) => setData(data))
  //       .catch((error) => {
  //         if (error.name === "AbortError") {
  //           console.log("Request cancelada");
  //         } else {
  //           setError(error);
  //         }
  //       })
  //       .finally(() => setLoading(false));

  //     return () => abortController.abort();//funcion de limpieza, para que la peticion no se termine de ejecutar

  //   }, []); //al ponerle como segundo elemento un array vacio hace que se ejecute una unica vez cuando se llame el componente
  //   //si exite data entonces recorrerla con un map

  //   const handleCancelRequest = () => {
  //     if (controller) {
  //       controller.abort();
  //       setError("Request cancelada")
  //     }
  //   }


  //   return { data, loading };
  // }

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);


  const abortController = new AbortController();
  setController(abortController);

  fetch(url, { signal: abortController.signal })
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => {
      if (error.name === "AbortError") {
        //console.log("Cancelled request");
      } else {
        setError(error);
      }
    })
    .finally(() => setLoading(false));

  return () => abortController.abort();


  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Cancelled Request");
    }
  };

  return { data, loading, error, handleCancelRequest };
}