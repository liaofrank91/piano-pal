import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BsArrowRightCircle } from "react-icons/bs"
import CircularProgress from '@mui/material/CircularProgress'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'

function SongComponent({ songItem }) {

    const navigate = useNavigate()

    const checkForExistingPracticeToday = () => {
        let exists = false
        let index = null

        if (!songItem) {
            toast.error("Woah slow down buddy")
        }

        songItem.practiceTime.forEach((song, i) => {
            if (song.date === (new Date().toLocaleDateString('en-CA'))) {
                exists = true
                index = i
            }
        })

        if (exists) {
            return index
        } else {
            return null
        }
    }

    return (
        <>
            <section className='flex flex-row justify-between items-center border-2 border-black m-3'>
                <div className='song-information flex flex-row' style={{ minWidth: '25vw' }}>
                    <h3 className='mt-2 ml-3'>{songItem.title}&nbsp;</h3>
                    <h4 className='mt-2'>by {songItem.composer}</h4>
                </div>

                <div className='progress-section flex flex-row items-center'>
                    <CircularProgress className='mt-1 mb-1' variant="determinate" value={(checkForExistingPracticeToday() !== null ? Math.min((songItem.practiceTime[checkForExistingPracticeToday()].timeAchieved / songItem.practiceTimeGoal * 100), 100) : 0)} size={35} color={'primary'} />
                    {/* Change colour from primary -> success if we hit 100% */}
                    <h4>&nbsp; Today: {(checkForExistingPracticeToday() !== null ? Math.min(Math.round(songItem.practiceTime[checkForExistingPracticeToday()].timeAchieved / songItem.practiceTimeGoal * 100), 100) : 0)}%&nbsp;&nbsp;&nbsp;</h4>
                    {(checkForExistingPracticeToday() !== null && songItem.practiceTime[checkForExistingPracticeToday()].timeAchieved >= songItem.practiceTimeGoal) ? <DoneOutlineIcon /> : <></>}
                </div>

                <button type='button' className='select-song-button'>
                    <BsArrowRightCircle size={30} className='mr-3' onClick={() => navigate(`/song/${songItem._id}`)} />
                </button>

            </section>
        </>
    )
}

export default SongComponent