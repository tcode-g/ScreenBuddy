import React, {PureComponent} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProcessData } from "./ProcessData";

// prop
type HorizontalBarChartProps = {
    payload: {
        succeses: number;
        fails: number;
    }
}



export default class HorizontalBarChart extends PureComponent<HorizontalBarChartProps> {
  handleInput(payload:any){
    let tempArr = [payload.succeses, payload.fails];
      return ProcessData(tempArr);
  }
  
  render() {
    return (
     <div style={{ height: 300 }}>
      <ResponsiveContainer width="40%" height="30%">
        <BarChart
          layout='vertical'  
          width={500}
          height={30}
          data={this.handleInput(this.props.payload)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          
          <XAxis type='number' />
          <YAxis type='category' dataKey='name'/>
          <Tooltip />
          <Legend />
          <Bar dataKey="success" stackId="a" fill="green" />
          <Bar dataKey="fail" stackId="a" fill="red" />
        </BarChart>
      </ResponsiveContainer>
    </div>   
    );
  }
}