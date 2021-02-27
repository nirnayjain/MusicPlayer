import React from 'react'
import LibrarySong from './LibrarySong.js'
const Library=({songs,setCurrentSong,audioref,isPlaying,setSong,libraryStatus,setPosition,position})=>{
    return(
    <div  className={`library  ${libraryStatus ? `toggle-library` : ' '} `}>
        <h2>Library</h2>
        <div className="library-songs">
       
            {songs.map((song)=>(
                <LibrarySong song={song} setCurrentSong={setCurrentSong} audioref={audioref} isPlaying={isPlaying} setSong={setSong} songs={songs} setPosition={setPosition} position={position}/>))}
            
        </div>
    </div>
    );
}
export default Library;