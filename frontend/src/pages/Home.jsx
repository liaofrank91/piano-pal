import { useState } from 'react'
import SongComponent from '../components/SongComponent'

function Home() {
  const [songList, setSongList] = useState([
    { user: '62ca462601f99e2dbe20a850', title: 'Ballade No. 1', composer: 'Frederic Chopin', id: '62cba101f1d4184d348a8fa7' },
    { user: '62ca462601f99e2dbe20a850', title: 'Akuma no Ko', composer: 'Animenz', id: '62cba18bf1d4184d348a8fad' },
    { user: '62ca462601f99e2dbe20a850', title: 'Orange', composer: 'James Chou', id: '62cba20b717763331e46b743' },
  ])

  return (
    <>
      <h1 style={{fontSize: 40}}>Your Repertoire</h1>
      {songList.map((song) => (
        <SongComponent key={song.id} songItem={song} />
      ))}
      <h2>Add To Your Repertoire</h2>
      <h2>Remove From Your Repertoire</h2>
    </>

  )
}

export default Home