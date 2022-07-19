import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import { listAllOrders } from "../../functions/admin";
import { getProductByCount } from "../../functions/product";

// import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { FiStar, FiShoppingCart } from "react-icons/fi";

//excel sheet
import OrdersExcel from "./data/OrdersExcel";

//charts
import SparkLine from "../admin/charts/SparkLine";
import Stacked from "../admin/charts/Stacked";
import Pie from "../admin/charts/Pie";
import AreaChartJS from "./charts/AreaChart";

function AdminAnalytics({ sale }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
//   const [product, setProduct] = useState();
  const [productTitle, setProductTitle] = useState();
  const [sold, setSold] = useState(0);


  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOrders();
    loadAllProducts();
  }, []);

  var countCompletedOrders = orders.filter((order) => {
    return order.orderStatus == "Completed";
  }).length;

  const loadAllOrders = () =>
    listAllOrders(user.token).then((res) => {
      setOrders(res.data);
    });

  const loadAllProducts = () => {
    getProductByCount(100)
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        let max = 0;
        res.data.map((p) => p.sold > max && (max = p.sold));
        setSold(max); 
        res.data.map((p) => (p.sold == max) && setProductTitle(p.title));
        // setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // const maxSold = Math.max(...products.map((item) => item.sold));
  // console.log("max sold product",maxSold);

  const weeklyStats = [
    {
      icon: <FiShoppingCart />,
      amount: sold,
      title: "Top Sales",
      desc: productTitle,
      iconBg: "#FB9678",
      pcColor: "red-600",
    },
    {
      icon: <FiStar />,
      amount: "$560",
      title: "Best Seller",
      desc: "MaterialPro Admin",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "red-600",
    },
  ];

  return (
    <div>
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-light dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Completed Orders</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Total Orders</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">
                    {orders.length}
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Total Orders</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">{countCompletedOrders}</p>

                <p className="text-gray-500 mt-1">Completed Orders</p>
              </div>

              {/* <div className="mt-5">
                <SparkLine
                  //currentColor={currentColor}
                  id="line-sparkLine"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={SparklineAreaData}
                  //color={currentColor}
                />
              </div> */}
              <div className="mt-10">
                {/* <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                /> */}

                <OrdersExcel />
              </div>
            </div>
            <div>
              <Stacked
                //currentMode={currentMode}
                width="320px"
                height="360px"
              />
            </div>
          </div>
        </div>
        <div>
          <div className=" rounded-2xl md:w-400 p-4 m-3 bg-light">
            {/*here  */}
            <div className="flex flex-wrap justify-center">
              <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-4 m-3">
                <div className="flex justify-between">
                  <p className="text-xl font-semibold">Weekly Stats</p>
                  <button
                    type="button"
                    className="text-xl font-semibold text-gray-500"
                  >
                    <IoIosMore />
                  </button>
                </div>
                <div className="mt-10 ">
                  {weeklyStats.map((item) => (
                    <div
                      key={item.title}
                      className="flex justify-between mt-4 w-full"
                    >
                      <div className="flex gap-4">
                        <button
                          type="button"
                          style={{ background: item.iconBg }}
                          className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                        >
                          {item.icon}
                        </button>
                        <div>
                          <p className="text-md font-semibold">{item.title}</p>
                          <p className="text-gray h6">{item.desc}</p>
                        </div>
                      </div>

                      <p className={`text-${item.pcColor}`}>{item.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* here */}
          </div>

          <div className="bg-light dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8  m-3 flex justify-center items-center gap-10">
            <div className="pr-5">
              <p className="text-2xl font-semibold ">${sale / 100}</p>
              <p className="text-gray-400">Total sales</p>
            </div>

            <div className="w-50">
              <Pie
                id="pie-chart"
                legendVisiblity={false}
                height="160px"
                width="120px"
              />
            </div>
          </div>
        </div>

        <div className="col-md-10 ">
          <div
            className=" rounded-2xl  m-3 p-4 bg-light"
            // style={{ backgroundColor: "#4DB6AC" }}
          >
            <div>
              <p className="text-info-200 text-center h4 p-2">
                Monthly revenue
              </p>
            </div>
            <AreaChartJS />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
