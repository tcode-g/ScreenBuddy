import React, {PureComponent} from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProcessData } from "./ProcessData";


// prop
type WeeklyDiagramProps = {
    payload: {
        daily: number[];
        weekly: number[];
    }
}

//let input =  // example of data from api response
//let data = ProcessData(this.);
//console.log(data);

export default class WeeklyHistogram extends PureComponent<WeeklyDiagramProps> {
  handleInput(payload:any){
      return ProcessData(payload.weekly);
  }
  
  render() {
    return (
     <div style={{ height: 300 }}>
      <ResponsiveContainer width="40%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={this.handleInput(this.props.payload)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" fill="#E75A7C" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>   
    );
  }
}