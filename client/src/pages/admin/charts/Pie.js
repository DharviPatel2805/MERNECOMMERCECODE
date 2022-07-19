import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { listAllOrders } from "../../../functions/admin";

import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";

const Pie = ({ id, legendVisiblity, height, width }) => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = () =>
    listAllOrders(user.token).then((res) => {
      //   console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  let total2021 = 0;
  let total2022 = 0;


  orders.map((order) => {
    if (order.createdAt.includes("2021")) {
      total2021 = total2021 + order.paymentIntent.amount;
    }
    if (order.createdAt.includes("2022")) {
        total2022 = total2022 + order.paymentIntent.amount;
      }
  });


  const ecomPieChartData = [
    { x: "2021", y: total2021 / 100, text: "2021" },
    { x: "2022", y: total2022/100, text: "2022" },
  ];

  return (
    <AccumulationChartComponent
      id={id}
      legendSettings={{ visible: legendVisiblity, background: "white" }}
      height={height}
      width={width}
      background="#fff"
      tooltip={{ enable: true }}
    >
      <Inject
        services={[
          AccumulationLegend,
          PieSeries,
          AccumulationDataLabel,
          AccumulationTooltip,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Sale"
          dataSource={ecomPieChartData}
          xName="x"
          yName="y"
          innerRadius="40%"
          startAngle={0}
          endAngle={360}
          radius="90%"
          explode
          explodeOffset="10%"
          explodeIndex={2}
          dataLabel={{
            visible: true,
            name: "text",
            position: "Inside",
            font: {
              fontWeight: "600",
              color: "#fff",
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default Pie;
