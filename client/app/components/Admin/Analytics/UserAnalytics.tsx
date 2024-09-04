import React, { FC } from "react";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";

import Loader from "../../Loader/Loader";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = {
  isDashboard?: boolean;
};

const analyticsData = [
  { name: "Jun 2023", uv: 3 },
  { name: "Jul 2023", uv: 4 },
  { name: "Dec 2023", uv: 9 },
  { name: "Nov 2023", uv: 8 },
  { name: "Aug 2023", uv: 5 },
  { name: "Sep 2023", uv: 6 },
  { name: "Oct 2023", uv: 7 },
];

const UserAnalytics: FC<Props> = (props: Props) => {
  return <div></div>;
};

export default UserAnalytics;
