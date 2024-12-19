import React from 'react';
import { CircleMarker, Marker, Tooltip } from 'react-leaflet';
import { GeoJSONLayersProps } from './GeoJsonLayers';
import { GeoJSON } from 'react-leaflet';

import './RouteLayer.css';

interface RouteLayerProps extends Pick<GeoJSONLayersProps, 'route'> {
    show: boolean;
}

const RouteLayer: React.FC<RouteLayerProps> = ({ route, show }) => {

    const processedRoute = route?.map((p, index) => [p.coordinates[1], p.coordinates[0], p.coordinates[2]]);

    return (
        <div>
            {show && processedRoute?.map((p, index) => (
                <Marker title={`${index}`} key={`_${index}`} position={{ lat: p[0], lng: p[1] }}>
                    <Tooltip direction="bottom" offset={[-15, 5]} opacity={1} permanent>
                        {index}
                    </Tooltip>
                </Marker>
            ))
            }
        </div >
    );
};

export default RouteLayer;
