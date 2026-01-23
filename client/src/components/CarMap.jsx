// React-Leaflet-ის კომპონენტების იმპორტი რუკის ასაგებად
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// Leaflet-ის აუცილებელი სტილების (CSS) იმპორტი, რათა რუკა სწორად გამოჩნდეს
import 'leaflet/dist/leaflet.css';
// Leaflet-ის ძირითადი ბიბლიოთეკის იმპორტი
import L from 'leaflet';

// მარკერის (ლოკაციის ნიშნულის) აიქონების იმპორტი სტანდარტული საქაღალდიდან
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// მარკერის ვიზუალის კონფიგურაცია (ხშირად საჭიროა React-ში, რადგან გზები იბნევა)
let DefaultIcon = L.icon({
    iconUrl: icon,               // მარკერის სურათი
    shadowUrl: iconShadow,       // მარკერის ჩრდილი
    iconSize: [25, 41],          // მარკერის ზომა (სიგანე, სიმაღლე)
    iconAnchor: [12, 41]         // წერტილი, რომლითაც მარკერი "ებჯინება" რუკას
});

// ამ ხაზით ვეუბნებით Leaflet-ს, რომ ყველა მარკერზე გამოიყენოს ჩვენ მიერ შექმნილი აიქონი
L.Marker.prototype.options.icon = DefaultIcon;

// მთავარი კომპონენტი, რომელიც იღებს კოორდინატებს (lat, lng) და მისამართს (address)
const CarMap = ({ lat, lng, address }) => {
  return (
    // რუკის კონტეინერის სტილი (სიმაღლე, სიგანე და მომრგვალებული კუთხეები)
    <div style={{ height: '400px', width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
      
      {/* MapContainer - რუკის მთავარი გარსი. center განსაზღვრავს სად იყოს ფოკუსირებული */}
      <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        
        {/* TileLayer - რუკის ვიზუალური ფენა (ამ შემთხვევაში OpenStreetMap-ის დიზაინი) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marker - წერტილი რუკაზე, რომელიც კონკრეტულ კოორდინატზე ზის */}
        <Marker position={[lat, lng]}>
          
          {/* Popup - ფანჯარა, რომელიც იხსნება მარკერზე დაწკაპუნებისას და აჩვენებს მისამართს */}
          <Popup>
            {address}
          </Popup>
          
        </Marker>
      </MapContainer>
    </div>
  );
};


export default CarMap;