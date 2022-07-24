// Stopwatch code taken from: https://w3collective.com/react-stopwatch/
// I've added cosmetic changes & messed around with the reset button to get it to trigger an action in the backend  
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { existingPractice, newPractice } from '../features/song/songSlice'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { GiMusicalNotes } from "react-icons/gi"


const Stopwatch = ({ checkFunction }) => {
    const { specificSong } = useSelector((state) => state.song)

    const dispatch = useDispatch()

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false)

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    const handleSubmit = () => {
        const timePracticed = Math.round(time / 60000)
        console.log(timePracticed)
        setRunning(false)
        setTime(0)
        let index = checkFunction()
        if (index !== null) {
            console.log('dispatching existingpractice')
            // use existingPractice()
            dispatch(existingPractice({
                songId: specificSong._id,
                minsToAdd: timePracticed,
                index
            }))
        } else {
            console.log('dispatching nexpractice');
            // use newPractice()
            dispatch(newPractice({
                songId: specificSong._id,
                minsToAdd: timePracticed
            }))
        }
    }

    return (
        <div className="stopwatch-section border-2 border-black flex flex-row justify-between items-center">
            <div className='ml-5'>
                <GiMusicalNotes size={60} />
            </div>
            <div className='stopwatch'>
                <div className="numbers mt-2">
                    <span><b style={{ fontSize: 30 }}>{("0" + Math.floor((time / 60000) % 60)).slice(-2)} mins </b></span>
                    <span><b style={{ fontSize: 30 }}>{("0" + Math.floor((time / 1000) % 60)).slice(-2)} seconds</b></span>
                </div>

                <ButtonGroup className='mb-2 ' variant="text" aria-label="text button group">
                    <Button type='button' onClick={() => setRunning(true)}>Start</Button>
                    <Button type='button' onClick={() => setRunning(false)}>Pause</Button>
                    <Button type='button' onClick={handleSubmit}>Submit</Button>
                </ButtonGroup>
            </div>
            <div className='mr-5'>
                <GiMusicalNotes size={60} />
            </div>
        </div>
    );
};

export default Stopwatch