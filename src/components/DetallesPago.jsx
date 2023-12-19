import React, { useState, useEffect } from 'react';
import useApiData from './getDatos';
import { enviroment } from './enviroment';

export default function DetallesPago({ facturaId, data }) {
  const factura = data.find((item) => item.factura_id === facturaId);

  if (!factura || !factura.detalles) {
    return <p>No se encontraron detalles para la factura {facturaId}</p>;
  }

  const [comidas, setComidas] = useState({});

  useEffect(() => {
    const fetchComida = async (comidaId) => {
      try {
        const response = await fetch(`${enviroment.url}/api/comidas/${comidaId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const comidaData = await response.json();
        setComidas((prevComidas) => ({
          ...prevComidas,
          [comidaId]: comidaData.nombre,
        }));
      } catch (error) {
        console.error(`Error al obtener la comida con ID ${comidaId}:`, error);
      }
    };

    factura.detalles.forEach((detalle) => {
      if (!comidas[detalle.comidaId]) {
        fetchComida(detalle.comidaId);
      }
    });
  }, [factura.detalles, comidas]);

  return (
    <div className='flex flex-col justify-center items-center mt-16'>
      <h1 className='text-xl pb-4'>Detalle de factura nro: {facturaId} </h1>
      <table>
        <thead className='bg-sky-400 text-center'>
          <th className='py-3'>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
        </thead>
        <tbody>
          {factura.detalles.map((detalle) => (
            <tr key={detalle.detalleId}>
              <td className='py-4 text-center'>{comidas[detalle.comidaId] || 'Cargando...'}</td>
              <td className='py-4 text-center'>{detalle.cantidad}</td>
              <td className='py-4 text-center'>{detalle.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
