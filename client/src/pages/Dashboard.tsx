import React, { useContext } from 'react';
import MapView from '../components/MapView';
import { EntriesContext } from '../context/EntriesContext';

const Dashboard: React.FC = () => {
    const { entries } = useContext(EntriesContext);
    const markers = entries.map(e => ({ lat: e.location.lat, lng: e.location.lng, popup: new Date(e.timestamp).toLocaleString() }));

    return (
        <div style={{ padding: '1rem' }}>
            <h1>TripTracker Dashboard</h1>
            <div id="map" style={{ width: '100%', height: '400px', backgroundColor: '#eee' }}>
                <MapView markers={markers} />
            </div>

            {/* TODO: Habit status summary cards */}
            <section style={{ marginTop: '1rem' }}>
                <h2>Habits Summary</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {/* Example card */}
                    <div style={{ flex: 1, padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
                        <h3>Walked 5km</h3>
                        <p>✅ Completed today</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;