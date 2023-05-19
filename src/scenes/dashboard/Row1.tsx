import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useMemo, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { useTheme } from "@mui/material";

const Row1 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();
  useEffect(() => {
    console.log('main-data:' ,data)    
    /*eslint-disable */
 }, []);   
  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data.monthlyData?.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);
  return (
    <>
    revenueExpenses &&
      <DashboardBox gridArea="a">
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "250px",
            height:"100%"
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
            }}
          >
            <ResponsiveContainer>
              <AreaChart
                width={500}
                height={400}
                data={revenueExpenses}
                margin={{
                  top: 15,
                  right: 25,
                  left: -10,
                  bottom: 30,
                }}
              > 
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={palette.grey[700]}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </DashboardBox>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
};

export default Row1;
