import React, { useContext, useState, useMemo } from 'react';
import { EntriesContext, Entry } from '../context/EntriesContext';
import MapView from '../components/MapView';

const Journal: React.FC = () => {
    const { entries } = useContext(EntriesContext);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    // Filter entries by date range
    const filtered = useMemo(() => {
        return entries.filter(e => {
            const d = new Date(e.timestamp);
            const afterStart = startDate ? d >= new Date(startDate) : true;
            const beforeEnd = endDate ? d <= new Date(endDate + 'T23:59:59') : true;
            return afterStart && beforeEnd;
        });
    }, [entries, startDate, endDate]);

    // Prepare markers for map view
    const markers = filtered.map(e => ({ lat: e.location.lat, lng: e.location.lng, popup: new Date(e.timestamp).toLocaleString() }));

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Journal</h1>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <label>
                    Start Date: <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </label>
                <label>
                    End Date: <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </label>
                <button onClick={() => setViewMode('list')} disabled={viewMode === 'list'}>List View</button>
                <button onClick={() => setViewMode('map')} disabled={viewMode === 'map'}>Map View</button>
            </div>

            {/* Content */}
            {viewMode === 'map' ? (
                <MapView markers={markers} />
            ) : filtered.length === 0 ? (
                <p>No entries in this date range.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {filtered.map((entry: Entry) => (
                        <li key={entry.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
                                {new Date(entry.timestamp).toLocaleString()}
                            </p>
                            <img
                                src={entry.photoUri}
                                alt="Journal entry"
                                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginTop: '0.5rem', borderRadius: '8px' }}
                            />
                            <p style={{ marginTop: '0.5rem' }}>
                                Location: {entry.location.lat.toFixed(5)}, {entry.location.lng.toFixed(5)}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Journal;