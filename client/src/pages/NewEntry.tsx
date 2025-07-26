import React, { useState, useEffect } from 'react';

// Extend the Navigator interface to include the camera property
declare global {
    interface Navigator {
        camera: any;
    }
}

const NewEntry: React.FC = () => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 1. Geolocation
    const getLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation not supported');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            pos => {
                setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            },
            err => setError(err.message),
            { enableHighAccuracy: true }
        );
    };

    // 2. Camera capture (Cordova plugin)
    const takePhoto = () => {
        // @ts-ignore: cordova-plugin-camera typings
        navigator.camera.getPicture(
            (uri: string) => setPhotoUri(uri),
            (err: any) => setError(err),
            {
                quality: 80,
                destinationType: (navigator.camera as any).DestinationType.FILE_URI,
                sourceType: (navigator.camera as any).PictureSourceType.CAMERA,
                correctOrientation: true
            }
        );
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
            {/* TODO: Save entry button to persist entry to local store or backend */}
        </div>
    );
};

export default NewEntry;