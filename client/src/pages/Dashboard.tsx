import React, { useContext } from 'react';
import MapView from '../components/MapView';
import { EntriesContext } from '../context/EntriesContext';
import { HabitsContext } from '../context/HabitsContext';

const Dashboard: React.FC = () => {
    const { entries } = useContext(EntriesContext);
    const { habits } = useContext(HabitsContext);
    const today = new Date().toISOString().split('T')[0];

     // Map markers from entries
    const markers = entries.map(e => ({
        lat: e.location.lat,
        lng: e.location.lng,
        popup: new Date(e.timestamp).toLocaleString()
    }));

    // Count completed vs total for today
    const totalHabits = habits.length;
    const completedCount = habits.filter(h =>
        Array.isArray(h.completedDates) && h.completedDates.includes(today)
    ).length;

    return (
        <div style={{ padding: '1rem' }}>
            <h1>TripTracker Dashboard</h1>
            
            {/* Map */}
            <div id="map" style={{ width: '100%', height: '400px', backgroundColor: '#eee' }}>
                <MapView markers={markers} />
            </div>

            {/* Habit Summary */}
            <section>
                <h2>Habits Summary</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1, padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
                        <h3>{completedCount} / {totalHabits}</h3>
                        <p>habits completed today</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;