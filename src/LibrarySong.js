import React from 'react';

const LibrarySong=({song,setCurrentSong,audioref,isPlaying,setSong,songs})=>
{
    const changeSong=async()=>{
      await setCurrentSong(song);
      
     
     const newSongs=songs.map((s)=>{
         if(song.id === s.id)
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
     if(isPlaying){
         audioref.current.play();
     }
      
        
    
      
      }
    return(
        <div className={`library-song-container ${song.active?'selected':" "} `} onClick={changeSong}>
            
           <img src={song.cover} alt=""></img>
           <div className="song-description">      
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
    )
}
export default LibrarySong;