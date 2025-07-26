import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Habit } from '../context/HabitsContext';
import { format, subDays } from 'date-fns';

interface StreakChartProps {
    habit: Habit;
    days?: number;
}

const StreakChart: React.FC<StreakChartProps> = ({ habit, days = 30 }) => {
    const data = useMemo(() => {
        const arr: Array<{ date: string; streak: number }> = [];
        let streak = 0;
        for (let i = days - 1; i >= 0; i--) {
            const date = subDays(new Date(), i);
            const dateStr = format(date, 'yyyy-MM-dd');
            if (habit.completedDates.includes(dateStr)) streak += 1;
            else streak = 0;
            arr.push({ date: format(date, 'MM/dd'), streak });
        }
        return arr;
    }, [habit, days]);

    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="streak" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default StreakChart;