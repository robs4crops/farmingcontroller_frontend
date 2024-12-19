import axios from 'axios';
import { GeoJSONLayersProps } from './GeoJsonLayers';

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
};
const fetchData = async (): Promise<GeoJSONLayersProps> => {
    try {
        const response = await axios.get('http://localhost:2000/lanes', {
            headers
        });


        const posResponse = await axios.get('http://localhost:2000/position', {
            headers
        });

        const routeResponse = await axios.get('http://localhost:2000/route', { headers });

        return {
            wlDone: response.data.workingLanes.done,
            wlLeft: response.data.workingLanes.left,
            wlOrig: response.data.workingLanes.original,
            tl: response.data.transportLanes.current,
            tlOrig: response.data.transportLanes.original,
            wpPos: posResponse.data.wpPos,
            gpsPos: posResponse.data.gpsPos,
            route: routeResponse.data
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            wlDone: undefined,
            wlLeft: undefined,
            wlOrig: undefined,
            tl: undefined,
            tlOrig: undefined,
            wpPos: undefined,
            gpsPos: undefined,
            route: undefined

        }
    }
};

export default fetchData;
