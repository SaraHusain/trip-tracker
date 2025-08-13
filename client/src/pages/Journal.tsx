import React, { useContext, useState, useMemo } from 'react';
import { EntriesContext, Entry } from '../context/EntriesContext';
import MapView from '../components/MapView';

const PHOTO_URL = process.env.REACT_APP_PHOTO_URL;

const Journal: React.FC = () => {
    const { entries, deleteEntry } = useContext(EntriesContext);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState<Entry | null>(null);

    const onSwitch = () => {
        setViewMode(viewMode === 'list' ?'map' : 'list')
    }

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

    const openConfirm = (entry: Entry) => {
        setEntryToDelete(entry);
        setConfirmOpen(true);
    };

    return (
        <div className='main-container'>

            <div className='row'>
                <h1>Journal</h1>
                <button className='action-button button' onClick={onSwitch}>{viewMode === 'list' ?'Map' : 'List'} View</button>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <label>
                    Start Date: <input style={{ minHeight: '1rem' }} type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </label>
                <label>
                    End Date: <input style={{ minHeight: '1rem' }} type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </label>
            </div>

            {/* Content */}
            {viewMode === 'map' ? (
                <MapView markers={markers} />
            ) : filtered.length === 0 ? (
                <p>No entries available.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {filtered.map((entry: Entry) => (
                        <li key={entry._id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
                                {new Date(entry.timestamp).toLocaleString()}
                            </p>
                            <img
                                src={PHOTO_URL + entry.photoUri}
                                alt="Journal entry"
                                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginTop: '0.5rem', borderRadius: '8px' }}
                            />
                            <div className='row'>
                                <p style={{ marginTop: '0.5rem' }}><b>Location:</b> {entry.location.lat.toFixed(5)}, {entry.location.lng.toFixed(5)}</p>
                                <button className='warning-button' onClick={() => openConfirm(entry)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Confirm Delete Modal */}
            {confirmOpen && entryToDelete && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3 style={{ marginBottom: '0.5rem' }}>Delete this entry?</h3>
                        <p style={{ marginTop: 0 }}>This action cannot be undone.</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                            <button className='action-button button' onClick={() => setConfirmOpen(false)}>Cancel</button>
                            <button
                                onClick={() => {
                                    deleteEntry(entryToDelete._id);
                                    setConfirmOpen(false);
                                }}
                                className='warning-button'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default Journal;