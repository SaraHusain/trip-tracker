import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Workaround for default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface MapViewProps {
  	markers?: Array<{ lat: number; lng: number; popup?: string }>;
}

const MapView: React.FC<MapViewProps> = ({ markers = [] }) => (
	<MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
		<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
		{markers.map((m, i) => (
			<Marker key={i} position={[m.lat, m.lng]}>
				{m.popup && <Popup>{m.popup}</Popup>}
			</Marker>
		))}
	</MapContainer>
);

export default MapView;