import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ProcessData } from './ProcessData';

type DailyDiagramProps = {
  payload: {
    daily: number[];
    weekly: number[];
  };
};

export default class DailyHistogram extends PureComponent<DailyDiagramProps> {
  handleInput(payload: any) {
    if (payload === null) return;
    return ProcessData(payload.daily);
  }

  render() {
    return (
      <div style={{
        height: 300,
        backgroundColor: '#34404b',
        borderRadius: '12px',
        padding: '1rem',
        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={this.handleInput(this.props.payload)}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2b343d" />
            <XAxis
              dataKey="name"
              stroke="#F2F5EA"
              style={{ fontFamily: 'Fredoka', fontSize: '0.85rem' }}
            />
            <YAxis
              stroke="#F2F5EA"
              style={{ fontFamily: 'Fredoka', fontSize: '0.85rem' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#2b343d',
                border: '1px solid #E75A7C',
                borderRadius: '8px',
                color: '#F2F5EA',
                fontFamily: 'Fredoka'
              }}
              labelStyle={{ color: '#F2F5EA', fontWeight: 500 }}
              itemStyle={{ color: '#E75A7C' }}
            />
            <Area
              type="monotone"
              dataKey="min"
              stroke="#E75A7C"
              strokeWidth={2}
              fill="url(#colorMin)"
            />
            <defs>
              <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E75A7C" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#E75A7C" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
