import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

// import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from '../data/AnalyticsData';

import { listAllOrders } from "../../../functions/admin";

const Stacked = ({ width, height }) => {
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


//   var ordersof2021 = orders.filter((order) => {
//     //  console.log("2021",(order.createdAt.includes('2021')));
//     return order.createdAt.includes("2021");
//   });

//   var comordersof2021 = orders.filter((order) => {
//     //  console.log("2021",(order.createdAt.includes('2021')));
//     return order.createdAt.includes("2021") && order.orderStatus == "Completed";
//   });

  const jan = [];
  const feb = [];
  const march = [];
  const april = [];
  const may = [];
  const june = [];
  const july = [];
  const aug = [];

  const jancom = [];
  const febcom = [];
  const marchcom = [];
  const aprilcom = [];
  const maycom = [];
  const junecom = [];
  const julycom = [];
  const augcom = [];

  var comMonthOrders = orders.map((order) => {
    if (
      new Date(order.createdAt).getMonth() + 1 == 1 &&
      order.orderStatus == "Completed"
    ) {
      jancom.push(order);
    }
    if (
      new Date(order.createdAt).getMonth() + 1 == 2 &&
      order.orderStatus == "Completed"
    ) {
      febcom.push(order);
    }
    if (
      new Date(order.createdAt).getMonth() + 1 == 3 &&
      order.orderStatus == "Completed"
    ) {
      marchcom.push(order);
    }
    if (
      new Date(order.createdAt).getMonth() + 1 == 4 &&
      order.orderStatus == "Completed"
    ) {
      aprilcom.push(order);
    }
    if (
      new Date(order.createdAt).getMonth() + 1 == 5 &&
      order.orderStatus == "Completed"
    ) {
      maycom.push(order);
    }
    if (
      new Date(order.createdAt).getMonth() + 1 == 6 &&
      order.orderStatus == "Completed"
    ) {
      junecom.push(order);
    }
    if (
      new Date(order.createdAt).getMonth() + 1 == 7 &&
      order.orderStatus == "Completed"
    ) {
      julycom.push(order);
    }
    if (
      new Date(order.createdAt).getMonth() + 1 == 8 &&
      order.orderStatus == "Completed"
    ) {
      augcom.push(order);
    }
  });

  var monthOrders = orders.map((order) => {
    if (new Date(order.createdAt).getMonth() + 1 == 1) {
      jan.push(order);
    }
    if (new Date(order.createdAt).getMonth() + 1 == 2) {
      feb.push(order);
    }
    if (new Date(order.createdAt).getMonth() + 1 == 3) {
      march.push(order);
    }
    if (new Date(order.createdAt).getMonth() + 1 == 4) {
      april.push(order);
    }
    if (new Date(order.createdAt).getMonth() + 1 == 5) {
      may.push(order);
    }
    if (new Date(order.createdAt).getMonth() + 1 == 6) {
      june.push(order);
    }
    if (new Date(order.createdAt).getMonth() + 1 == 7) {
      july.push(order);
    }
    if (new Date(order.createdAt).getMonth() + 1 == 8) {
      aug.push(order);
    }
  });

  const stackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: "Rotate45",
    valueType: "Category",
  };

  const stackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    // minimum: 100,
    // maximum: 400,
    // interval: 100,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: "{value}",
  };

  const stackedChartData = [
    [
      //total orders
      { x: "Jan", y: jan.length },
      { x: "Feb", y: feb.length },
      { x: "March", y: march.length },
      { x: "April", y: april.length },
      { x: "May", y: may.length },
      { x: "Jun", y: june.length },
      { x: "July", y: july.length },
      { x: "August", y: aug.length },

      //   { x: 2021, y: ordersof2021.length },
      //   { x: 2022, y: orders.length },
    ],
    [
      //completed orders
      { x: "Jan", y: jancom.length },
      { x: "Feb", y: febcom.length },
      { x: "March", y: marchcom.length },
      { x: "April", y: aprilcom.length },
      { x: "May", y: maycom.length },
      { x: "Jun", y: junecom.length },
      { x: "July", y: julycom.length },
      { x: "August", y: augcom.length },

      //   { x: 2021, y: comordersof2021.length },
      //   { x: 2022, y: countCompletedOrders },
    ],
  ];

  const stackedCustomSeries = [
    {
      dataSource: stackedChartData[0],
      xName: "x",
      yName: "y",
      name: "Total Orders",
      type: "StackingColumn",
      background: "blue",
    },

    {
      dataSource: stackedChartData[1],
      xName: "x",
      yName: "y",
      name: "Completed Orders",
      type: "StackingColumn",
      background: "red",
    },
  ];

  return (
    <ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background="#fff"
      legendSettings={{ background: "white" }}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {stackedCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;
