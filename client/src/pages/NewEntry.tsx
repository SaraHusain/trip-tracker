import React, { useState, useEffect, useContext } from 'react';
import { EntriesContext } from '../context/EntriesContext';
import { useNavigate } from 'react-router-dom';

const NewEntry: React.FC = () => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { addEntry } = useContext(EntriesContext);

    const navigate = useNavigate();

    // 1. Geolocation
    const getLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation not supported');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            pos => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            err => setError(err.message),
            { enableHighAccuracy: true }
        );
    };

    // 2. Camera capture (Cordova plugin or HTML fallback)
    const takePhoto = () => {
        if ((window as any).cordova && (navigator as any).camera) {
            // Cordova environment
            (navigator as any).camera.getPicture(
                (uri: string) => setPhotoUri(uri),
                (err: any) => setError(err),
                {
                    quality: 80,
                    destinationType: (navigator as any).camera.DestinationType.FILE_URI,
                    sourceType: (navigator as any).camera.PictureSourceType.CAMERA,
                    correctOrientation: true
                }
            );
        } else {
            // Web fallback: file input
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = e => {
                const file = (e.target as any).files[0];
                if (file) {
                    const url = URL.createObjectURL(file);
                    setPhotoUri(url);
                }
            };
            input.click();
        }
    };
    
    // 3. Save the photo
    const saveEntry = () => {
        if (photoUri && location) {
            addEntry({ photoUri, location });
            navigate('/success');
        }
    };
    
    useEffect(() => {
        getLocation();
    }, []);

    return (
        <div style={{ padding: '1rem' }}>
            <h1>New Entry</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={takePhoto}>Take Photo</button>
            {photoUri && (
                <div>
                    <h3>Preview:</h3>
                    <img src={photoUri} alt="Entry" style={{ maxWidth: '100%', marginTop: '1rem' }} />
                </div>
            )}
            {location && (
                <p>Location: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p>
            )}
            {(photoUri || location) && <button onClick={saveEntry} style={{ marginTop: '1rem' }}>Save Entry</button>}
        </div>
    );
};

export default NewEntry;