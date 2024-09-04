import React, { useEffect } from "react";
import { styles } from "@/app/styles/style";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import Loader from "../../Loader/Loader";

// const data = [
//   {
//     name: "Page A",
//     Count: 400,
//   },
//   {
//     name: "Page B",
//     Count: 300,
//   },
//   {
//     name: "Page C",
//     Count: 200,
//   },
//   {
//     name: "Page D",
//     Count: 278,
//   },
//   {
//     name: "Page E",
//     Count: 189,
//   },
//   {
//     name: "Page F",
//     Count: 239,
//   },
//   {
//     name: "Page G",
//     Count: 349,
//   },
// ];

type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});
  useEffect(() => {}, []);

  const analyticsData: any = [];
  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.name, Count: item.count });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
          <div
            className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Order Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                last 12 months analytics data
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              !isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
