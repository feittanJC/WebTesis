import React, { useState } from 'react';
import Dashboard from '../dashboard/Dashboard';
import TablaPagos from '../../components/TablaPagos';
import DetallesPago from '../../components/DetallesPago';
import { enviroment } from '../../components/enviroment';
import useApiData from '../../components/getDatos';

export default function Pagos() {
  const [selectedFacturaId, setSelectedFacturaId] = useState(null);

  const handleVerDetalles = (facturaId) => {
    setSelectedFacturaId(facturaId);
    // Puedes realizar acciones adicionales aquí, como cargar más detalles del objeto si es necesario.
  };

  const url = enviroment.url + '/api/factura/get';
  const data = useApiData(url);

  if (data.loading) {
    return <p>Loading...</p>;
  }

  if (data.error) {
    return <p>Error: {data.error}</p>;
  }

  return (
    <>
      <Dashboard />
      <h1 className="text-center text-3xl pt-5 pb-4 font-bold">Tabla de Facturas </h1>
      <div className="flex justify-center pt-10">
        <TablaPagos handleClick={handleVerDetalles} data={data} />
      </div>
      {selectedFacturaId && <DetallesPago facturaId={selectedFacturaId} data={data.data} />}
    </>
  );
}
