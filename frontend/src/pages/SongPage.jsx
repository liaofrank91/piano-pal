import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getSong, reset } from '../features/song/songSlice'
import LinearProgress from '@mui/material/LinearProgress'
import Button from '@mui/material/Button'
import Spinner from '../components/Spinner'
import Stopwatch from '../components/Stopwatch'

function SongPage() {
    const { songId } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isSuccess, specificSong } = useSelector((state) => state.song)
    // THOUGHTS ____________________________________________________________________    
    // after i dispatch(getSong(songId)), the global state's specificSong should be updated, and even after the page re-renders because of a local state change the songId will still be there... right?

    useEffect(() => {
        dispatch(getSong(songId))

        return () => {
            dispatch(reset())
        }
    }, [])

    // checks if specificSong.practiceTime array has an object with a date field that matches with the current date. returns the index of specificSong.practiceTime that corresponds to the right object if exists, and returns null if not
    const checkForExistingPracticeToday = () => {
        let exists = false
        let index = null

        if (!specificSong) {
            toast.error("Woah slow down buddy")
        }

        specificSong.practiceTime.forEach((song, i) => {
            if (song.date === (new Date().toLocaleDateString('en-CA'))) {
                exists = true
                index = i
            }
        })

        if (exists) {
            console.log('found')
            return index
        } else {
            console.log('not found')
            return null
        }

    }

    if (isLoading) {
        return <Spinner />
    }


    return (
        <>
            <section>
                <Button type='button' onClick={() => navigate('/')} variant="outlined">Home</Button>
                <br />
                <br />
                <h1 style={{ fontSize: 50 }} className='mb-0'>{specificSong && specificSong.title}</h1>
                <h3 style={{ fontSize: 25, fontStyle: 'italic' }} className='mt-0'>{specificSong && specificSong.composer}</h3>
                <br />
                <h2 style={{ fontSize: 20 }} className='flex flex-row justify-start'>
                    Practicing Progress for Today
                </h2>
                <LinearProgress variant="determinate" value={specificSong && (checkForExistingPracticeToday() !== null ? Math.min((specificSong.practiceTime[checkForExistingPracticeToday()].timeAchieved / specificSong.practiceTimeGoal * 100), 100) : 0)} />
                <h4 style={{ fontStyle: 'italic' }} className='flex flex-row justify-start mt-1'>
                    <b>{specificSong && (checkForExistingPracticeToday() !== null ? specificSong.practiceTime[checkForExistingPracticeToday()].timeAchieved : 0)}&nbsp;</b>
                    out of&nbsp;
                    <b>{specificSong && specificSong.practiceTimeGoal}&nbsp;</b>
                    minutes achieved today
                </h4>
                <br /><br />

                <div className='stopwatch-part'>
                    <h2 style={{ fontSize: 20 }} className='flex flex-row justify-start'>Log Practice Times!</h2>
                    <Stopwatch checkFunction={checkForExistingPracticeToday}/>
                </div>
                <br /><br />

                <div>
                    <h2 style={{ fontSize: 20 }} className='flex flex-row justify-start'>Add a Note</h2>                
                </div>
                <br /><br />

                <div>
                    <h2 style={{ fontSize: 20 }} className='flex flex-row justify-start'>Your Notes</h2>                
                </div>



            </section>

        </>
    )
}

export default SongPage