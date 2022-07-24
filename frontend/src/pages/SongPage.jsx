import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { getSong, reset, updatePracticeTimeGoal, addNote } from '../features/song/songSlice'
import LinearProgress from '@mui/material/LinearProgress'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SettingsIcon from '@mui/icons-material/Settings'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Spinner from '../components/Spinner'
import Stopwatch from '../components/Stopwatch'
import Note from '../components/Note'

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

let today = new Date().toLocaleDateString('en-CA')
let yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
yesterday = yesterday.toLocaleDateString('en-CA')

function SongPage() {
    const { songId } = useParams()

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteModalIsOpen, setNoteModalIsOpen] = useState(false)
    const [newGoal, setNewGoal] = useState(null)
    const [noteForm, setNoteForm] = useState({
        date: today,
        miscNotes: '',
        bars: ''
    })
    const { date, miscNotes, bars } = noteForm

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
        if (newGoal > 0) {
            dispatch(updatePracticeTimeGoal({
                songId: specificSong._id,
                newGoal
            }))
            closeModal()
        } else {
            toast.error('Please enter a positive Goal')
        }
    }

    const handleAddNote = (e) => {
        e.preventDefault()
        dispatch(addNote({
            songId: specificSong._id,
            note: {
                date,
                miscNotes,
                bars
            }
        }))
        closeNoteModal()
    }

    // Open/close modal for editing practice time
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    // Open/close modal for adding a note
    const openNoteModal = () => setNoteModalIsOpen(true)
    const closeNoteModal = () => setNoteModalIsOpen(false)

    // Handle note form change
    const onChange = (e) => {
        setNoteForm({
            ...noteForm,
            [e.target.id]: e.target.value
        })
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
                    <div className='flex flex-row justify-between'>
                        <h2 style={{ fontSize: 20 }} className='flex flex-row justify-start'>Today's Notes</h2>
                        <button type='button' onClick={openNoteModal}>
                            <AddCircleOutlineIcon />
                        </button>
                    </div>
                    {specificSong && specificSong.notes.map((note) => (note.date === today && (<Note key={note._id} note={note} category='today'/>)
                    ))}
                </div>
                <br /><br />

                <div>
                    <h2 style={{ fontSize: 20 }} className='flex flex-row justify-start'>Yesterday's Notes</h2>
                    {specificSong && specificSong.notes.map((note) => (note.date === yesterday && (<Note key={note._id} note={note} category='yesterday'/>)))}
                </div>
                <br /><br />

                <div>
                    <h2 style={{ fontSize: 20 }} className='flex flex-row justify-start'>Note Archive</h2>
                    {specificSong && specificSong.notes.map((note) => (note.date !== yesterday && note.date !== today && (<Note key={note._id} note={note} category='archive'/>)))}
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

            <Modal isOpen={noteModalIsOpen} onRequestClose={closeNoteModal} style={customStyles} contentLabel='Add A Note'>
                <div className='flex flex-row justify-between'>
                    <h2>Add a Note</h2>
                    <button onClick={closeNoteModal} className="btn-close">X</button>
                </div>
                <form onSubmit={handleAddNote} className='flex flex-col'>
                    <br />
                    <TextField style={{ width: '100%' }} id="bars" label="Bars (optional)" variant="outlined" type='text' onChange={onChange} />
                    <br />
                    <TextField style={{ width: '100%' }} id="miscNotes" label="Notes" variant="outlined" type='text' onChange={onChange} required/>
                    <br />
                    <Button type='submit' variant="outlined" style={{ width: '100%' }}>Add</Button>
                </form>
            </Modal>

        </>
    )
}

export default SongPage