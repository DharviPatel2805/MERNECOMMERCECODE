import React from "react";

const ShowPaymentInfo = ({ order }) => (
    <table className="table table-bordered ">
        <tbody>
            <tr>
                <th scope="row"> Order Id </th>
                <td> {order.paymentIntent.id} </td>
            </tr>
        </tbody>

        <tbody>
            <tr>
                <th scope="row"> Amount </th>
                <td> ${(order.paymentIntent.amount /= 100)} </td>
            </tr>
        </tbody>

        <tbody>
            <tr>
                <th scope="row"> Method </th>
                <td> {order.paymentIntent.payment_method_types[0]} </td>
            </tr>
        </tbody>

        <tbody>
            <tr>
                <th scope="row"> Payment </th>
                <td className="badge bg-success" > {order.paymentIntent.status.toUpperCase()} </td>
            </tr>
        </tbody>

        <tbody>
            <tr>
                <th scope="row"> Ordered On </th>
                <td> {new Date(order.createdAt).toLocaleString()} </td>
            </tr>
        </tbody>

        <tbody>
            <tr>
                <th scope="row"> STATUS </th>
                <td className="badge bg-primary text-white "> {order.orderStatus} </td>
            </tr>
        </tbody>
    </table>
)

export default ShowPaymentInfo;