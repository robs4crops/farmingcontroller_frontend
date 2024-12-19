import axios from 'axios';
import React from 'react';

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
};

interface TankProps {
    level: number; // Current tank level as a percentage (0-100)
    maxLevel: number; // Maximum tank level as a percentage (0-100)    
}

const Tank: React.FC = () => {
    const [tankLevel, setTankLevel] = React.useState<TankProps>({ level: 600, maxLevel: 600 });
    const [amount, setAmount] = React.useState<number>(5);

    const { level, maxLevel } = tankLevel;
    const getLevelColor = (level: number) => {
        if (level > 75) return 'green';
        if (level > 50) return 'yellow';
        if (level > 25) return 'orange';
        return 'red';
    };

    React.useEffect(() => {
        const interval = setInterval(async () => {
            await getTankLevel();
        }, 1000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [tankLevel]);

    const getCurrentLane = async () => {
        try {
            return axios.get('http://localhost:2000/lanes/current');
        } catch (error) {
            console.error('Error calling API method 3:', error);
            return undefined;
        }
    }


    React.useEffect(() => {


        const decreaseTankLevel = async (amount: number) => {
            try {
                const currentLane = await getCurrentLane();
                if (currentLane?.data?.properties?.lanetype === 'working') {
                    const response = await axios.put(`http://localhost:2000/tankLevel/decrease/${amount}`, {
                        headers
                    });
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error calling API method 1:', error);
            }
        };
        const interval = setInterval(async () => {
            await decreaseTankLevel(amount);
        }, 1 * 1000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [amount]);

    const getTankLevel = async () => {
        try {
            const response = await axios.get('http://localhost:2000/tankLevel');
            setTankLevel(response.data);
        } catch (error) {
            console.error('Error calling API method 2:', error);
        }
    };



    const normalizedLevel = Math.round(((level) / (maxLevel) * 100));

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', width: '200px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '10px' }}>Tank Level</div>
            <div
                style={{
                    height: '30px',
                    width: '100%',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '5px',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: `${normalizedLevel}%`,
                        backgroundColor: getLevelColor(normalizedLevel),
                        transition: 'width 0.3s ease-in-out',
                    }}
                ></div>
            </div>

            <div style={{ marginTop: '10px', fontSize: '16px' }}>{normalizedLevel}%</div>

            <div style={{ marginTop: '10px' }}>
                <label htmlFor="amount">Decrease Amount: </label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={{ width: '50px' }}
                />
            </div>
        </div>
    );
};

export default Tank;
