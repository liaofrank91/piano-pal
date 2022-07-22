import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSong } from '../features/song/songSlice'
import LinearProgress from '@mui/material/LinearProgress'
import Spinner from '../components/Spinner'

function SongPage() {
    const [chosenSong, setChosenSong] = useState({})

    const { songId } = useParams()

    const dispatch = useDispatch()

    const { isLoading, isSuccess, specificSong } = useSelector((state) => state.song)

    // USE THIS FORMAT FOR DAYS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let newDate = new Date().toLocaleDateString('en-CA')  
    console.log(newDate)

    // ** IF: specificSong exists & there isn't an entry in practiceTime under the current date, just put 0 / whatever
    // ** IF: specificSong exists & there IS an entry in practiceTime under the current date, use that number / whatever 
    //////////////////////////////////////////////////////////////////

    useEffect(() => {
        dispatch(getSong(songId))
    }, [])

    if (isLoading) {
        return <Spinner />
    }


    return (
        <>
            <section>
                <div>{songId}</div>
                <h1 style={{ fontSize: 50 }} className='mb-0'>{specificSong && specificSong.title}</h1>
                <h3 style={{ fontSize: 25, fontStyle: 'italic' }} className='mt-0'>{specificSong && specificSong.composer}</h3>
                <br />
                <h2 className='flex flex-row justify-start'>
                    Practicing Progress for Today
                </h2>
                <LinearProgress variant="determinate" value={70} />
                <h4 style={{ fontStyle: 'italic' }} className='flex flex-row justify-start mt-1'>
                    <b>xx&nbsp;</b>
                    out of&nbsp;
                    <b>{specificSong && specificSong.practiceTimeGoal}&nbsp;</b>
                    minutes achieved today
                </h4>
                <div></div>

                <div>
                    Add a note for tomorrow
                </div>

                <div>
                    Practicing notes from yesterday
                </div>



            </section>

        </>
    )
}

export default SongPage