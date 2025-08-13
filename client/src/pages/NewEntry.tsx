import React, { useState, useEffect, useContext } from 'react';
import { EntriesContext, NewEntryPayload } from '../context/EntriesContext';
import { useNavigate } from 'react-router-dom';

const NewEntry: React.FC = () => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
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

    // 2. Camera / file capture
    const takePhoto = () => {
        if ((window as any).cordova && (navigator as any).camera) {
            (navigator as any).camera.getPicture(
                async (uri: string) => {
                    setPhotoUri(uri);
                    // Fetch blob from the file URI and turn into a File
                    const blob = await fetch(uri).then(r => r.blob());
                    const file = new File([blob], `entry_${Date.now()}.jpg`, { type: blob.type });
                    setPhotoFile(file);
                },
                (err: any) => setError(err),
                {
                    quality: 80,
                    destinationType: (navigator as any).camera.DestinationType.FILE_URI,
                    sourceType: (navigator as any).camera.PictureSourceType.CAMERA,
                    correctOrientation: true
                }
            );
        } else {
            // Web fallback
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = e => {
                const file = (e.target as HTMLInputElement).files![0];
                if (file) {
                    setPhotoFile(file);
                    setPhotoUri(URL.createObjectURL(file));
                }
            };
            input.click();
        }
    };

    // 3. Save — now pass in the File
    const saveEntry = async () => {
        if (photoFile && location) {
            await addEntry({ file: photoFile, location } as NewEntryPayload);
            navigate('/success');
        }
    };

    useEffect(getLocation, []);

    return (
        <div className='main-container'>
            <div className='row'>
                <h1>New Entry</h1>
                <button className='action-button button' onClick={takePhoto}>Upload a Photo</button>
            </div>

            {error && <p className='error'>{error}</p>}


            {photoUri && (
                <div>
                    <h3>Preview:</h3>
                    <img
                        src={photoUri}
                        alt="Entry preview"
                        className='image'
                    />
                </div>
            )}

            {location && (
                <p><b>Location:</b> {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p>
            )}

            {photoFile && location && (
                <button className='action-button button' onClick={saveEntry} style={{ marginTop: '1rem' }}>Save Entry</button>
            )}
        </div>
    );
};

export default NewEntry;