import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { addToRepertoire } from '../features/repertoire/repertoireSlice'
import { getSongsByUser, removeSong } from '../features/song/songSlice'
import SongComponent from '../components/SongComponent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'


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

Modal.setAppElement('#root')

function Home() {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false)
  const [addForm, setAddForm] = useState({
    title: '',
    composer: '',
    practiceTimeGoal: 0,
  })
  const [toBeRemoved, setToBeRemoved] = useState('')

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { songList, isLoading } = useSelector((state) => state.song)

  const onChange = (e) => {
    setAddForm({
      ...addForm,
      [e.target.id]: e.target.value
    })
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()

    if (addForm.practiceTimeGoal <= 0) {
      toast.error('Please enter a valid practice goal')
    } else {
      let songData = {
        ...addForm,
        user: user._id,
        email: user.email
      }
      dispatch(addToRepertoire(songData))
      closeAddModal()
      window.location.reload()
    }

  }

  const handleRemoveSubmit = (e) => {
    e.preventDefault()
    dispatch(removeSong(toBeRemoved))
    closeRemoveModal()
    window.location.reload()
  }

  // Open/close modals
  const openAddModal = () => {
    setRemoveModalIsOpen(false)
    setAddModalIsOpen(true)
  }
  const closeAddModal = () => setAddModalIsOpen(false)
  const openRemoveModal = () => {
    setAddModalIsOpen(false)
    setRemoveModalIsOpen(true)
  }
  const closeRemoveModal = () => setRemoveModalIsOpen(false)

  const handleChange = (e) => {
    setToBeRemoved(e.target.value)
  }

  useEffect(() => {
    // useEffect does NOT run again after the modal opens (which is controlled by add/removeModalIsOpen state)
    dispatch(getSongsByUser(user._id))
    // eslint-disable-next-line
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <h1 style={{ fontSize: 40 }}>Your Repertoire</h1>
      {songList && songList.map((song) => (
        <SongComponent key={song._id} songItem={song} />
      ))}

      <br />
      <div className='flex flex-row justify-between'>
        <Fab color="primary" aria-label="add" onClick={openAddModal}>
          <AddIcon />
        </Fab>
        <h2 style={{ fontSize: 30 }}>Add To / Remove From Your Repertoire</h2>
        <Fab color="secondary" aria-label="remove" onClick={openRemoveModal}>
          <RemoveIcon />
        </Fab>
      </div>

      {/* addModal */}
      <Modal isOpen={addModalIsOpen} onRequestClose={closeAddModal} style={customStyles} contentLabel='Add a Song to Repertoire'>
        <div className='flex flex-row justify-between'>
          <h2>Add a Song to your Repertoire</h2>
          <button onClick={closeAddModal} className="btn-close">X</button>
        </div>
        <form onSubmit={handleAddSubmit} className='flex flex-col'>
          <br />
          <TextField style={{ width: '100%' }} id="title" label="Title of the Song" variant="outlined" type='text' onChange={onChange} required />
          <br />
          <TextField style={{ width: '100%' }} id="composer" label="Composer/Arranger Name" variant="outlined" type='text' onChange={onChange} required />
          <br />
          <TextField style={{ width: '100%' }} id="practiceTimeGoal" label="Daily Practice Goal (mins) (can be changed later)" variant="outlined" type='number' onChange={onChange} required />
          <br />
          <Button type='submit' variant="outlined" style={{ width: '100%' }}>Add!</Button>
        </form>
      </Modal>

      {/* removeModal */}
      <Modal isOpen={removeModalIsOpen} onRequestClose={closeRemoveModal} style={customStyles} contentLabel='Add a Song to Repertoire'>
        <div className='flex flex-row justify-between'>
          <h2>Remove a Song from your Repertoire</h2>
          <button onClick={closeRemoveModal} className="btn-close">X</button>
        </div>
        <br />
        <form onSubmit={handleRemoveSubmit}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Song</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Song"
              value={toBeRemoved}
              onChange={handleChange}
            >
              {songList && songList.map((song) => (
                <MenuItem key={song._id} value={song._id}>{song.title}</MenuItem>
              ))}
            </Select>
            <br />
            <Button type='submit' variant="outlined" style={{ width: '100%' }}>Remove</Button>
          </FormControl>
        </form>
      </Modal>

    </>

  )
}

export default Home