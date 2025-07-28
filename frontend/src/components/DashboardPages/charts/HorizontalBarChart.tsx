import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ProcessData } from "./ProcessData";

type HorizontalBarChartProps = {
  payload: {
    succeses: number;
    fails: number;
  };
};

export default class HorizontalBarChart extends PureComponent<HorizontalBarChartProps> {
  handleInput(payload: any) {
    const { succeses, fails } = payload;
    return ProcessData([succeses, fails]);
  }

  render() {
    return (
      <div
        style={{
          height: 300,
          backgroundColor: "#34404b",
          borderRadius: "12px",
          padding: "1rem",
          boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)"
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={this.handleInput(this.props.payload)}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2b343d" />
            <XAxis
              type="number"
              stroke="#F2F5EA"
              style={{ fontFamily: "Fredoka", fontSize: "0.85rem" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#F2F5EA"
              style={{ fontFamily: "Fredoka", fontSize: "0.85rem" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#2b343d",
                border: "1px solid #E75A7C",
                borderRadius: "8px",
                color: "#F2F5EA",
                fontFamily: "Fredoka"
              }}
              labelStyle={{ color: "#F2F5EA", fontWeight: 500 }}
              itemStyle={{ color: "#E75A7C" }}
            />
            <Legend
              wrapperStyle={{
                color: "#F2F5EA",
                fontFamily: "Fredoka",
                fontSize: "0.9rem"
              }}
            />
            <Bar
              dataKey="success"
              stackId="a"
              fill="#4CAF50"
              radius={[0, 8, 8, 0]}
            />
            <Bar
              dataKey="fail"
              stackId="a"
              fill="#F44336"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
