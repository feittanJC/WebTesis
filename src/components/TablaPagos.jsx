import React from 'react'
import useApiData from './getDatos'
import { enviroment } from './enviroment'

export default function TablaPagos() {

    const url = enviroment.url + "/api/factura/get"

    const data = useApiData(url)

    console.log(data)



    return (
        <table>
            <thead>
                <th>Id Factura</th>
                <th>Email</th>
                <th>Pago Total</th>
            </thead>
            <tbody>
                <td>gdfgdf</td>
            </tbody>
        </table>
    )
}
