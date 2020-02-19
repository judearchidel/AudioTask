import React, {useState } from 'react';
import classes from './AudioPlayer.module.scss';
import mp3_file from '../assets/song.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle, faStopCircle , faVolumeUp ,
    faVolumeMute , faPlus , faMinus} from '@fortawesome/free-solid-svg-icons'

const Audio = () =>{
    const [duration,setDuration]=useState(0);
    const [currenttime,setCurrenttime]=useState(0);
    const [percent,setPercent] = useState(0)
    const [play,setPlay]=useState(false);
    const [mute,setmute]= useState(false);
    const [volume, setVolume]= useState(0.5);

    const setTime= (duration)=>{
        setDuration(duration)
    }
    const playSong =()=>{
        const player = document.getElementById('audio_player');
        if(!play)
        {
            player.play();
            setPlay(true)
        }else{
            player.pause();
            setPlay(false)
        }
    }
    const playStop = () =>{
        const player = document.getElementById('audio_player');
        player.pause();
        player.volume = volume;
        setPlay(false)
        player.currentTime = 0.00;
        setCurrenttime(0.00);
    }

    const VolumeMute = () =>{
        const player = document.getElementById('audio_player');
        if(!mute)
        {player.muted=true;
        setmute(true);
        }else{
            player.muted=false;
            setmute(false); 
        }
    }
    const VolumeControl= (control) => {
        const player = document.getElementById('audio_player');
        if(control==="up" && (volume+0.1) < 1){
            setVolume(volume+0.1);
        }else if(control==="down" && (volume-0.1) > 0){
            setVolume(volume-0.1);
        }
        player.volume = volume;
    }

    const setPosition=(value)=>{
        const player = document.getElementById('audio_player');
        player.currentTime= value;
        setCurrenttime(value);
    }
  
    return (<div  className={classes.Audio}>
                <div className={classes.AudioPlayer}>
                        <div className={classes.DisplyTime}>
                                <p>{(currenttime/60).toFixed(2)}<span>/</span>{(duration/60).toFixed(2)}</p> 
                                <p>{percent} <span>%</span></p>
                        </div>
                        <div className={classes.Controls}>
                                <button className={classes.Button} onClick={()=>playSong()}>
                                {play?<FontAwesomeIcon icon={faPauseCircle} className={classes.Icon}/>
                                :<FontAwesomeIcon icon={faPlayCircle}  className={classes.Icon}/>}</button>
                                <button className={classes.Button} onClick={()=>playStop()}><FontAwesomeIcon icon={faStopCircle} className={classes.Icon}/></button>
                                <button className={classes.Button} onClick={()=>VolumeMute()}>
                                {mute?<FontAwesomeIcon icon={faVolumeUp} className={classes.Icon}/>
                                :<FontAwesomeIcon icon={faVolumeMute} className={classes.Icon}/>}
                                </button>
                                <button className={classes.Button} onClick={()=>VolumeControl("up")}><FontAwesomeIcon icon={faPlus} className={classes.Icon}/></button>
                                <button className={classes.Button} onClick={()=>VolumeControl("down")}><FontAwesomeIcon icon={faMinus} className={classes.Icon}/></button>
                        </div>
                        <div className={classes.SeekBar}>
                              <input type="range" id='seek' onInput={(event)=>setPosition(event.target.value)} value={currenttime} max={duration} readOnly></input>
                              
                        </div>
                
                    <audio id="audio_player" preload='metadata' onLoadedMetadata={event => {setTime(event.target.duration)}} 
                    onTimeUpdate={(event)=>{
                        setCurrenttime(event.target.currentTime);
                        const perc= event.target.currentTime/duration;
                        setPercent(Math.floor(perc*100))
                    }}>
                    <source id="src_mp3" type="audio/mp3"  preload="metadata" src={mp3_file}/>
                    </audio>
                 </div>
        </div>)
}


export default Audio;

/*<br></br>
<progress id='seek' value={currenttime} max={duration}></progress> */