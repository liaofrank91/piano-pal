import { useState } from 'react'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { addToRepertoire } from '../features/repertoire/repertoireSlice'
import SongComponent from '../components/SongComponent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { toast } from 'react-toastify'

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
  const [songList, setSongList] = useState([
    { user: '62ca462601f99e2dbe20a850', title: 'Ballade No. 1', composer: 'Frederic Chopin', id: '62cba101f1d4184d348a8fa7' },
    { user: '62ca462601f99e2dbe20a850', title: 'Akuma no Ko', composer: 'Animenz', id: '62cba18bf1d4184d348a8fad' },
    { user: '62ca462601f99e2dbe20a850', title: 'Orange', composer: 'James Chou', id: '62cba20b717763331e46b743' },
  ])
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false)
  const [addForm, setAddForm] = useState({
    title: '',
    composer: '',
    practiceTimeGoal: 0,
  })

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

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

    }

  }

  const handleRemoveSubmit = (e) => {
    e.preventDefault()

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

  return (
    <>
      <h1 style={{ fontSize: 40 }}>Your Repertoire</h1>
      {songList.map((song) => (
        <SongComponent key={song.id} songItem={song} />
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
        <h2>Remove a Song from your Repertoire</h2>
        <button onClick={closeRemoveModal} className="btn-close">X</button>

      </Modal>

    </>

  )
}

export default Home