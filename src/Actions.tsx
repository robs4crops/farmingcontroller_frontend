import axios from 'axios';
import { Feature, FeatureCollection, LineString } from 'geojson';
import React from 'react';
import Button from '@mui/material/Button';
import { Box, MenuItem, Select } from '@mui/material';
import Tank from './Tank';

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
};

const doPost = async (method: string) => {
    try {
        const response = await axios.post(`http://localhost:2000/${method}`, {
            headers
        });
    } catch (error) {
        console.error('Error calling API method {method}:', error);
    }
};

const Actions: React.FC = () => {
    const [laneIds, setLaneIds] = React.useState<string[]>([]);
    const [actions, setActions] = React.useState<string[]>([]);
    const [selectedLaneId, setSelectedLaneId] = React.useState<string>('');


    const removeSelectedLane = async () => {
        try {
            const response = await axios.delete(`http://localhost:2000/lanes/${selectedLaneId}`, {
                headers
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error calling API method 4:', error);
        }
    };

    const backThroughLane = async () => {
        try {
            const response = await axios.post(`http://localhost:2000/backThroughLane/${selectedLaneId}`, {
                headers
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error calling API method 4:', error);
        }
    };

    React.useEffect(() => {
        const interval = setInterval(async () => {
            await getLanes();
        }, 1000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [setLaneIds, setSelectedLaneId]);

    const getLanes = async () => {
        try {
            const response = await axios.get('http://localhost:2000/lanes');
            const lanes = response.data.workingLanes.left as FeatureCollection<LineString & { properties: { id: string } }>;
            const laneIds = lanes.features.map((lane: Feature<LineString & { properties: { id: string } }>) => lane.properties?.id);
            setLaneIds(laneIds);
            // if (!laneIds.some(x => x == selectedLaneId)) {
            //     setSelectedLaneId(laneIds[0]);
            // }
        } catch (error) {
            console.error('Error calling API method 3:', error);
        }
    };

    React.useEffect(() => {
        const interval = setInterval(async () => {
            await getActions();
        }, 1000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [setActions]);

    const getActions = async () => {
        try {
            const response = await axios.get('http://localhost:2000/actions');
            const actions = response.data.actions;
            setActions(actions);
        } catch (error) {
            console.error('Error calling API method actions:', error);
        }
    };

    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <div>
                <h3>Lane actions</h3>
                <Select value={selectedLaneId} onChange={(e) => setSelectedLaneId(e.target.value)}>
                    {laneIds.map((id) => (
                        <MenuItem key={id} value={id}>{id}</MenuItem>
                    ))}
                </Select>
                <Button variant="contained" onClick={removeSelectedLane}>Remove selected lane</Button>
                <Button variant="contained" onClick={backThroughLane}>Back through selected lane</Button>
                <Button variant="contained" onClick={() => doPost('backToBase')}>Back to Base</Button>
            </div>
            <div>
                <h3>Planned actions</h3>
                <ol>
                    {actions.map((action) => 
                    <li>{action}</li>
                    )}
                </ol>
            </div>
            <div>
                <h3>Route actions</h3>
                <div>
                    <Button variant="contained" onClick={() => doPost('replan')}>Replan</Button>
                    <Button variant="contained" onClick={() => doPost('start')}>Start</Button>
                    <Button variant="contained" onClick={() => doPost('pause')}>Pause</Button>
                    <Button variant="contained" onClick={() => doPost('stop')}>Stop</Button>
                </div>
            </div>
            <Tank />
        </Box>
    );
};

export default Actions;
