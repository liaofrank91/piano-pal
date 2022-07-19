import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'

function SongPage() {

    const { songId } = useParams()

    useEffect(() => {
        console.log('hi');
    })

    return (
        <>
            <section>
                <div>{songId}</div>
                <h1 style={{ fontSize: 50 }} className='mb-0'>Ballade No 1</h1>
                <h3 style={{ fontSize: 25, fontStyle: 'italic' }} className='mt-0'>Frederic Chopin</h3>
                <br />
                <h2 className='flex flex-row justify-start'>
                    Practicing Progress for Today
                </h2>
                <LinearProgress variant="determinate" value={70} />
                <h4 style={{fontStyle:'italic'}} className='flex flex-row justify-start mt-1'>
                    <b>xx</b>
                    out of 
                    <b>yy</b>
                    minutes achieved today
                </h4>
                
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