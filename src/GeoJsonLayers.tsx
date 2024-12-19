import React from 'react';
import { GeoJSON, Marker } from 'react-leaflet';
import { FeatureCollection, LineString, MultiLineString, Point } from 'geojson';
import L from 'leaflet';
import './GeoJsonLayers.css';
// import "leaflet/dist/leaflet.css";

export interface GeoJSONLayersProps {
    wlDone: FeatureCollection<LineString> | undefined;
    wlLeft: FeatureCollection<LineString> | undefined;
    tl: FeatureCollection<MultiLineString> | undefined;
    tlOrig: FeatureCollection<MultiLineString> | undefined;
    wlOrig: FeatureCollection<LineString> | undefined;
    wpPos?: Point | undefined;
    gpsPos?: Point | undefined;
    route: Point[] | undefined;
}

const tractorIcon = new L.Icon({
    iconUrl: 'tractor.svg',
    // iconRetinaUrl: require('../img/marker-pin-person.svg'),

    iconSize: new L.Point(40, 50),
    className: 'tractor',

});
const positions = (wpPos: Point, gpsPos: Point) => <div>
    {/* <GeoJSON key={"w" + JSON.stringify(wpPos)} style={{ color: 'blue' }} data={wpPos} /> */}
    <Marker key={"gps" + JSON.stringify(gpsPos)} position={{ lat: gpsPos.coordinates[1], lng: gpsPos.coordinates[0] }} icon={tractorIcon} />
    {/* <Marker key={"gps" + JSON.stringify(gpsPos)} position={{ lat: gpsPos.coordinates[0], lng: gpsPos.coordinates[1] }} icon={tractorIcon} /> */}
</div>

const GeoJsonLayers: React.FC<Omit<GeoJSONLayersProps, 'route'>> = ({ wlDone, wlLeft, tl, wpPos, gpsPos, wlOrig, tlOrig }) => {
    if (!wlDone || !wlLeft || !tl || !wlOrig || !tlOrig) {
        return null;
    }

    return (
        <div>
            <GeoJSON key={JSON.stringify(wlOrig.features.flatMap(x => x.geometry.coordinates))} style={{ color: 'grey' }} data={wlOrig} />
            <GeoJSON key={JSON.stringify(tlOrig.features.flatMap(x => x.geometry.coordinates))} style={{ color: 'grey' }} data={tlOrig} />

            <GeoJSON key={"wlLeft" + JSON.stringify(wlLeft.features.flatMap(x => x.geometry.coordinates))} style={{ color: '#03ecfc' }} data={wlLeft} />
            <GeoJSON key={"wlDone" + JSON.stringify(wlDone.features.flatMap(x => x.geometry.coordinates))} style={{ color: '#00549f' }} data={wlDone} />
            <GeoJSON key={"tl" + JSON.stringify(tl.features.flatMap(x => x.geometry.coordinates))} style={{ color: '#008a00' }} data={tl} />
            {wpPos && gpsPos ? positions(wpPos, gpsPos) : null}
        </div>
    );
};

export default GeoJsonLayers;
