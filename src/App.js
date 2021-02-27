import React,{useState,useRef}from 'react';
//import componentts
import Song from './Components/Song.js'
import Player from './Components/Player.js'
//import style
import "./Style/App.scss"
//import data
import  data from './Data.js'
//import library
import Library from './Library.js'
//import Nav
import Nav from './Components/Nav.js'

function App() {
  const audioref=useRef(null);
    const [songInfo,setSongInfo]=useState({
        currentTime :0,
        duration :0,
        animationPercentage:0
    })
     const timeUpdateHandler=(e)=>
    {
        const current=e.target.currentTime;
        const duration=e.target.duration;
        
        const roundCurrent=Math.round(current);
        const roundDuration=Math.round(duration);
        const animation=Math.round((roundCurrent/roundDuration)*100);
  
        setSongInfo({...songInfo,currentTime: current,duration: duration,animationPercentage:animation})
        
    }
    const playNextSong= async()=>{
         let position=songs.findIndex((song)=> song.id === currentSong.id)
         await setCurrentSong(songs[(position+1)%songs.length])
         audioref.current.play();
        

    }
  const[songs,setSong]=useState(data());
  const[currentSong,setCurrentSong]=useState(songs[0])
  const[isPlaying,setIsPlaying]=useState(false)
  const[libraryStatus,setLibraryStatus]=useState(false)
  const[position,setPosition]=useState(0);
  

  return (

      <div className="music-player">
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
        <Song currentSong={currentSong} />
        <Player 
        currentSong={currentSong}
         isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioref={audioref}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          setCurrentSong={setCurrentSong}
           setPosition={setPosition} 
           position={position}
           songs={songs}
           setSong={setSong}
           
      
             />
         <Library songs={songs} setCurrentSong={setCurrentSong} audioref={audioref} isPlaying={isPlaying} setSong={setSong} libraryStatus={libraryStatus} position={position} setPosition={setPosition} />
            <audio onTimeUpdate={timeUpdateHandler} src={currentSong.audio} ref={audioref} onLoadedMetadata={timeUpdateHandler} onEnded={playNextSong}></audio>
            
        
        
      </div>
  );
}

export default App;
