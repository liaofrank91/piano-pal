import { useNavigate } from 'react-router-dom'
import { BsArrowRightCircle } from "react-icons/bs"
import CircularProgress from '@mui/material/CircularProgress'

function SongComponent({ songItem }) {

    const navigate = useNavigate()

    return (
        <>
            <section className='flex flex-row justify-between items-center border-2 border-black m-3'>
                <div className='song-information flex flex-row' style={{ minWidth: '25vw' }}>
                    <h3 className='mt-2 ml-3'>{songItem.title}&nbsp;</h3>
                    <h4 className='mt-2'>by {songItem.composer}</h4>
                </div>

                <div className='progress-section flex flex-row items-center'>
                    <CircularProgress className='mt-1 mb-1' variant="determinate" value={67} size={35} color={'primary'}/>
                    {/* Change colour from primary -> success if we hit 100% */}
                </div>

                <button type='button' className='select-song-button'>
                    <BsArrowRightCircle size={30} className='mr-3' onClick={() => navigate(`/song/${songItem._id}`)} />
                </button>

            </section>
        </>
    )
}

export default SongComponent