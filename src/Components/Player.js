import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay,faAngleLeft,faAngleRight,faPause} from '@fortawesome/free-solid-svg-icons'

const Player=({currentSong,isPlaying,setIsPlaying,audioref,songInfo,setSongInfo,setCurrentSong,songs,setSong})=>
{
    useEffect(()=>{
        
     const newSongs=songs.map((s)=>{
         if(currentSong.id === s.id)
         {
             
             return{
                 ...s,
                    active: true,
             };
     
               
            }
             
         
         else{
               return{
                 ...s,
                    active: false,}
               
             
         }
     })
     setSong(newSongs);
    },[currentSong])
    
    const playSongHandler=()=>{
        if(isPlaying)
        {
        
        audioref.current.pause();
        setIsPlaying (!isPlaying);
        }
        else
      { 
        
        audioref.current.play();
        setIsPlaying(!isPlaying);
      }

    }
   
    const getTime=(time)=>{
        return(
            Math.floor(time/60) + ":" + ("0" + Math.floor(time%60)).slice(-2)
        )
    }
    const dragSlider=(e)=>{
        audioref.current.currentTime=e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value})
    }
    const skipSongHandler=async (direction)=>{
        
        let position=songs.findIndex((song)=> song.id === currentSong.id)
        if(direction === "forward")
        {
        await setCurrentSong(songs[(position+1)%songs.length])
        }
        else
        {
             if(position===0)
             {
                await setCurrentSong(songs[songs.length-1])
             }
             else{
        await setCurrentSong(songs[position-1])
             }
        }
        if(isPlaying){
            audioref.current.play();
        }
        
        
    
        
    };
    const trackAnimation={
        transform:`translateX(${songInfo.animationPercentage}%)`
    }
    
 
    return(
    <div className="player">
        <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <div className="track" style={{background : `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}} >
            <input onChange={dragSlider} min={0} max={songInfo.duration} value={songInfo.currentTime} type="range"/>
            <div className="animate-track" style={trackAnimation}></div>
            </div>
            <p>{songInfo.duration?getTime(songInfo.duration):"0:00"}</p>
        </div>
        <div className="play-control">
            <FontAwesomeIcon className="skip-backward" size="2x" icon={faAngleLeft} onClick={()=>{skipSongHandler("back")}} />
            <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying?faPause:faPlay} />
            <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} onClick={()=>{skipSongHandler("forward")}} />
            
        </div>
        
    </div>
    );
}
export default Player;