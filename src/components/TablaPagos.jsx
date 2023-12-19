import React from 'react'


import { FaInfoCircle } from "react-icons/fa";
export default function TablaPagos({handleClick,data }) {

  


  return (
    <table className='rounded-2xl'>
      <thead className='bg-cyan-300 border-2 border-black rounded-t-2xl'>
        <tr className='px-12'>
          <th className='py-4 text-center'>Id Factura</th>
          <th className='py-4 text-center'>Email</th>
          <th className='py-4 text-center'>Pago Total</th>
          <th className='py-4 text-center'>Acciones</th>
        </tr>
      </thead>

      <tbody className='border-2 border-black rounded-b-2xl'>
        {data.data && data.data.map((factura) => (
          <tr key={factura.factura_id} className='border-black border-b rounded-2xl'>
            <td className='py-4 text-center'>{factura.factura_id}</td>
            <td className='py-4 text-center'>{factura.user_email || 'N/A'}</td>
            <td className='py-4 text-center'>{factura.total}</td>
            <td className='py-4 flex justify-center items-center'>
              <FaInfoCircle className='text-xl cursor-pointer' onClick={() => handleClick(factura.factura_id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>


  );
}
