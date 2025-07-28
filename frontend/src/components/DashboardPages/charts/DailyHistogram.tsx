import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProcessData } from "./ProcessData";

type DailyDiagramProps = {
    payload: {
        daily: number[];
        weekly: number[];
    }
}

//let input = [12, 5, 8, 6, 8, 9, 2, 4, 14, 54, 31, 23, 12, 14, 15, 13, 4, 14, 45, 34, 23, 0, 0, 0]; // example of data from api response
//let data = ProcessData(input);
//console.log(data);

export default class DailyHistogram extends PureComponent<DailyDiagramProps> {
    handleInput(payload:any){
        if(payload === null){
            return;
        }
        return ProcessData(payload.daily);
    }
    
    render() {
        return (
        <div style={{ height: 300 }}> 
            <ResponsiveContainer width="40%" height="100%">
                <AreaChart
                width={500}
                height={400}
                data={this.handleInput(this.props.payload)}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
                >
                
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="min" stroke="#8884d8" fill="#E75A7C" />
                </AreaChart>
            </ResponsiveContainer>
        </div>       
        );
    }
}    