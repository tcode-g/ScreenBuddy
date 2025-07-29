import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ProcessData } from "./ProcessData";

type WeeklyDiagramProps = {
  payload: {
    daily: number[];
    weekly: number[];
  };
};

export default class WeeklyHistogram extends PureComponent<WeeklyDiagramProps> {
  handleInput(payload: any) {
    return ProcessData(payload.weekly);
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
            data={this.handleInput(this.props.payload)}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2b343d" />
            <XAxis
              dataKey="name"
              stroke="#F2F5EA"
              style={{ fontFamily: "Fredoka", fontSize: "0.85rem" }}
            />
            <YAxis
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
              dataKey="minutes"
              fill="#E75A7C"
              activeBar={
                <Rectangle fill="#fd7e97" stroke="#E75A7C" strokeWidth={2} />
              }
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
