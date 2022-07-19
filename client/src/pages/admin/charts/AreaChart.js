import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { listAllOrders } from "../../../functions/admin";

import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
  } from "recharts";

  
  export default function AreaChartJS() {
    const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = () =>
    listAllOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  let jancom = 0;
  let febcom = 0;
  let marchcom = 0;
  let aprilcom = 0;
  let maycom = 0;
  let junecom = 0;
  let julycom = 0;
  let augcom = 0;
  let septcom = 0;
  let octcom = 0;
  let navcom = 0;
  let deccom = 0;

  var monthOrders = orders.map((order) => {
    if (new Date(order.createdAt).getMonth() + 1 == 1) {
      jancom = jancom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 2) {
      febcom = febcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 3) {
      marchcom = marchcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 4) {
      aprilcom = aprilcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 5) {
      maycom = maycom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 6) {
      junecom = junecom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 7) {
      julycom = julycom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 8) {
      augcom = augcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 9) {
      septcom = septcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 10) {
      octcom = octcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 11) {
      navcom = navcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 12) {
      deccom = deccom + order.paymentIntent.amount;
    }
  });
 

  const data = [
    // { date: "7 july" , value: 1.2333 },
    // { date: "9 july" , value: 2.2333 },
    // { date: "11 july" , value: 0.2333 },
    { x: "Jan", revenue: jancom/100 },
    { x: "Feb", revenue: febcom/100 },
    { x: "March", revenue: marchcom /100},
    { x: "April", revenue: aprilcom/100 },
    { x: "May", revenue: maycom/100 },
    { x: "June", revenue: junecom /100},
    { x: "July", revenue: julycom /100},
    { x: "August", yval: augcom /100},
    // { x: "Sept", yval: septcom /100 },
    // { x: "Oct", yval: octcom /100 },
    // { x: "Nav", yval: navcom /100},
    // { x: "Dec", yval: deccom /100},
  ];
  



    return (
      <ResponsiveContainer width="100%" height={300} >
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4DB6AC" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#4DB6AC" stopOpacity={0.05} />
            </linearGradient>
          </defs>
  
          <Area dataKey="revenue" stroke="#4DB6AC" fill="url(#color)" />
  
          <XAxis
            dataKey="x"
            axisLine={false}
            tickLine={false}
          />
  
          <YAxis
            datakey="revenue"
            axisLine={false}
            tickLine={false}
            tickCount={8}
            tickFormatter={(revenue) => `$${revenue}`}
          />
  
          <Tooltip />
  
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  
  function CustomTooltip({ active, payload, label }) {
    if (active) {
      return (
        <div className="tooltip">
          <h4>{label}</h4>
          <p>${payload[0].value.toFixed(2)} CAD</p>
        </div>
      );
    }
    return null;
  }