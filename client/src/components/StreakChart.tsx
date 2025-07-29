import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Habit } from '../context/HabitsContext';
import { format, subDays } from 'date-fns';

interface StreakChartProps {
    habit: Habit;
    days?: number;
}

const StreakChart: React.FC<StreakChartProps> = ({ habit, days = 30 }) => {
    const datesArray = Array.isArray(habit.completedDates)
        ? habit.completedDates
        : [];

    const data = useMemo(() => {
        const arr: Array<{ date: string; streak: number }> = [];
        let streak = 0;

        for (let i = days - 1; i >= 0; i--) {
            const dateObj = subDays(new Date(), i);
            const dateStr = format(dateObj, 'yyyy-MM-dd');
            // use our safe array
            if (datesArray.includes(dateStr)) streak += 1;
            else streak = 0;
            arr.push({ date: format(dateObj, 'MM/dd'), streak });
        }
        return arr;
    }, [datesArray, days]);

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