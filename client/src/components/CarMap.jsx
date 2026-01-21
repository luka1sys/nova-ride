import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// მარკერის აიქონის გასწორება (Leaflet-ს ხანდახან სჭირდება რეაქტში)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const CarMap = ({ lat, lng, address }) => {
  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
      <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            {address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CarMap;