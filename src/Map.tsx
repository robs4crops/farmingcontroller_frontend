import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./Map.css";
import React, { useEffect, useState } from 'react';
import fetchData from './fetchData';
import GeoJsonLayers, { GeoJSONLayersProps } from './GeoJsonLayers';
import RouteLayer from './RouteLayer';
import { Box, Button } from '@mui/material';
import { CRS } from 'leaflet';

const Map = () => {
  const [mapData, setData] = useState<GeoJSONLayersProps>({ wlDone: undefined, wlLeft: undefined, wlOrig: undefined, tl: undefined, tlOrig: undefined, wpPos: undefined, gpsPos: undefined, route: undefined });
  const [showRoute, setShowRoute] = useState<boolean>(false);
  const [showMarker, setShowMarker] = useState<boolean>(true);
  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchData();
      setData(data)
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [mapData]);

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      setData(data);
    };
    fetchDataAsync();
  }, []);

  const { wlDone, wlLeft, wlOrig, tl, tlOrig, wpPos, gpsPos, route } = mapData;


  return (<div>
    <Box>
      <div>
        <img src="r4c-logo-color.svg" alt="R4C Logo" style={{ width: '300px', marginTop: '20px' }} />
        {/* <h3>Marker actions</h3>
        <Button variant="contained" onClick={() => setShowMarker(!showMarker)}>
          {showMarker ? 'Hide Tractor' : 'Show Tractor'}
        </Button> */}

        <h3>Route visibility</h3>
        <Button variant="contained" onClick={() => setShowRoute(!showRoute)}>
          {showRoute ? 'Hide Route' : 'Show Route'}
        </Button>
      </div>
    </Box>
    <MapContainer
      doubleClickZoom={false}
      zoom={20}
      id="map"
      // crs={CRS.Earth}
      center={[
        37.943538,
        22.771914
      ]}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG9tc2NodXQiLCJhIjoiY20yMGloYWRpMGh1ZTJqcXZ0c29hbnFlZSJ9.ewhlf9rKCZ86SRU4ql_sHQ"
        maxNativeZoom={19}
        maxZoom={25}
      />
      <GeoJsonLayers wlDone={wlDone} wlLeft={wlLeft} wlOrig={wlOrig} tl={tl} tlOrig={tlOrig} wpPos={showMarker ? wpPos : undefined} gpsPos={showMarker ? gpsPos : undefined} />
      <RouteLayer route={route} show={showRoute} />
    </MapContainer >
  </div >
  );
};

export default Map;
