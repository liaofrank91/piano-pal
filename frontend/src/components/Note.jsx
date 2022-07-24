import { deleteNote } from '../features/song/songSlice'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'

function Note({ note, category }) {

    const dispatch = useDispatch()
    const {specificSong} = useSelector((state) => state.song)
    
    {/* #b6e7ea*/ }
    return (
        <>
            <div className='flex flex-row justify-center'>
                <div style={{ backgroundColor: '#EAF5FE', width: '50%' }} className='rounded-l-lg'>
                    {note.bars ? <h2 style={{ marginBottom: 0 }}>Bars: {note.bars}</h2> : <h2>General Note</h2>}
                    {category === 'archive' && <h4 style={{ fontStyle: 'italic' }} >({note.date})</h4>}
                    <div key={note._id}>
                        {note.miscNotes}
                    </div>
                </div>
                <div style={{ backgroundColor: '#FEEAF5', width: '5%' }} className='rounded-r-lg flex flex-col justify-center items-center'>
                    <button type='button' onClick={() => dispatch(deleteNote({songId: specificSong._id, noteId: note._id}))}><DeleteIcon /></button>
                </div>
            </div >
            <br />
        </>
    )
}

export default Note