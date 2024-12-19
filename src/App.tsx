import Actions from './Actions';
import Map from "./Map";

import './App.css'; // Assuming you will add some CSS for styling

export default function App() {
  return (
    <div className="app-container">
      <div className="actions-container">
        
        <Actions />
      </div>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
}
