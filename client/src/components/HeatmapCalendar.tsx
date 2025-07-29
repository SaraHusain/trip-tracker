import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Habit } from '../context/HabitsContext';

interface HeatmapProps {
    habits?: Habit[];
    habitId: string;
}

const HeatmapCalendar: React.FC<HeatmapProps> = ({ habits = [], habitId }) => {
    const habit = habits.find(h => h._id === habitId);
    if (!habit) return null;

    // Ensure completedDates is always an array
    const datesArray = Array.isArray(habit.completedDates)
        ? habit.completedDates
        : [];

    const values = datesArray.map(dateStr => ({
        date: dateStr,
        count: 1
    }));

    return (
        <CalendarHeatmap
            startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
            endDate={new Date()}
            values={values}
            classForValue={(value) =>
                !value || value.count === 0
                ? 'color-empty'
                : 'color-scale-'+Math.min(value.count, 4)
            }
            showWeekdayLabels
        />
    );
};

export default HeatmapCalendar;