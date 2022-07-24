import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { getSong, reset, updatePracticeTimeGoal } from '../features/song/songSlice'
import LinearProgress from '@mui/material/LinearProgress'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SettingsIcon from '@mui/icons-material/Settings'
import Spinner from '../components/Spinner'
import Stopwatch from '../components/Stopwatch'

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

function SongPage() {
    const { songId } = useParams()

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [newGoal, setNewGoal] = useState(null)

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
            // console.log('found')
            return index
        } else {
            console.log('not found')
            return null
        }

    }

    let existingPracticeToday = null
    if (specificSong) {
        existingPracticeToday = checkForExistingPracticeToday()
        console.log(existingPracticeToday)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log('hi', specificSong, newGoal)
        dispatch(updatePracticeTimeGoal({
            songId: specificSong._id, 
            newGoal
        }))
        closeModal()
    }

    // Open/close modals
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)


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
                <div className='flex flex-row justify-between'>
                    <h2 style={{ fontSize: 20 }} className='flex flex-row justify-start'>
                        Practicing Progress for Today
                    </h2>
                    <button type='button' onClick={openModal}><SettingsIcon /></button>
                </div>
                <LinearProgress variant="determinate" value={specificSong && (existingPracticeToday !== null ? Math.min((specificSong.practiceTime[existingPracticeToday].timeAchieved / specificSong.practiceTimeGoal * 100), 100) : 0)} />
                <h4 style={{ fontStyle: 'italic' }} className='flex flex-row justify-start mt-1'>
                    <b>{specificSong && (existingPracticeToday !== null ? specificSong.practiceTime[existingPracticeToday].timeAchieved : 0)}&nbsp;</b>
                    out of&nbsp;
                    <b>{specificSong && specificSong.practiceTimeGoal}&nbsp;</b>
                    minutes achieved today
                </h4>
                <br /><br />

                <div className='stopwatch-part'>
                    <h2 style={{ fontSize: 20 }} className='flex flex-row justify-start'>Log Practice Times!</h2>
                    <Stopwatch checkFunction={checkForExistingPracticeToday} />
                </div>
                <br /><br />

                <div>
                    <h2 style={{ fontSize: 20 }} className='flex flex-row justify-start'>Add a Note</h2>
                </div>
                <br /><br />

                <div>
                    <h2 style={{ fontSize: 20 }} className='flex flex-row justify-start'>Your Notes</h2>
                </div>
                <br /><br />

                <div>
                    <h2 style={{ fontSize: 20 }} className='flex flex-row justify-start'>LMAO</h2>
                </div>
                <br /><br />
            </section>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Change Practice Goal'>
                <div className='flex flex-row justify-between'>
                    <h2>Update Your Practice Goal</h2>
                    <button onClick={closeModal} className="btn-close">X</button>
                </div>
                <form onSubmit={handleUpdate} className='flex flex-col'>
                    <br />
                    <TextField style={{ width: '100%' }} id="newPracticeTimeGoal" label="New Practice Goal" variant="outlined" type='number' onChange={(e) => setNewGoal(e.target.value)} required />
                    <br />
                    <Button type='submit' variant="outlined" style={{ width: '100%' }}>Update</Button>
                </form>
            </Modal>

        </>
    )
}

export default SongPage