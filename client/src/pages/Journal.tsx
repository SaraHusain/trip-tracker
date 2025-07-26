import React, { useContext } from 'react';
import { EntriesContext, Entry } from '../context/EntriesContext';

const Journal: React.FC = () => {
    const { entries } = useContext(EntriesContext);

    if (entries.length === 0) {
        return <p style={{ padding: '1rem' }}>No journal entries yet. Add one!</p>;
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Journal</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {entries.map((entry: Entry) => (
                    <li key={entry.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
                            {new Date(entry.timestamp).toLocaleString()}
                        </p>
                        <img src={entry.photoUri} alt="Journal entry" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginTop: '0.5rem', borderRadius: '8px' }} />
                        <p style={{ marginTop: '0.5rem' }}>
                            Location: {entry.location.lat.toFixed(5)}, {entry.location.lng.toFixed(5)}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Journal;