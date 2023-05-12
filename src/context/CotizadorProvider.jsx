import { useState, createContext } from "react";
import {
  calcularMarca,
  calcularPlan,
  formatearDinero,
  obtenerDiferencia,
} from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    año: "",
    plan: "",
  });

  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(false);

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    //base
    let resultado = 2000;
    //diferencia de años
    const diferencia = obtenerDiferencia(datos.año);
    //restar el 3% por año
    resultado -= (diferencia * 3 * resultado) / 100;
    //calcular segun la marca
    resultado *= calcularMarca(datos.marca);
    //calcular segun el plan
    resultado *= calcularPlan(datos.plan);
    //formatear el dinero
    resultado = formatearDinero(resultado);
    setCargando(true);

    setTimeout(() => {
      setResultado(resultado);
      setCargando(false);
    }, 3000);
  };

  return (
    <CotizadorContext.Provider
      value={{
        error,
        resultado,
        datos,
        cargando,
        setError,
        cotizarSeguro,
        handleChangeDatos,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
