import React, {useState } from 'react';
import classes from './AudioPlayer.module.scss';
import mp3_file from '../assets/song.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle, faStopCircle , faVolumeUp ,
        faVolumeMute , faPlus , faMinus} from '@fortawesome/free-solid-svg-icons';
import SeekBar from './Seekbar/Seekbar';


const Audio = () =>{
    const [duration,setDuration]=useState(0);
    const [currenttime,setCurrenttime]=useState(0);
    const [percent,setPercent] = useState(0)
    const [play,setPlay]=useState(false);
    const [mute,setmute]= useState(false);
    const [volume, setVolume]= useState(0.5);
    const [fade,setFade] = useState('');

    let iconClass = classes.Icon;
    let iconStopclass = [classes.Icon];
    let iconUpclass = [classes.Icon];
    let iconDownclass = [classes.Icon];

    if(fade === "stop" ){
        iconStopclass.push(classes.fade)
     }else if(fade === "up" ){
        iconUpclass.push(classes.fade)
     }else if(fade === "down" ){
        iconDownclass.push(classes.fade)
     }
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
                        <p>Audio player</p>
                        <div className={classes.DisplyTime}>
                                <p>{(currenttime/60).toFixed(2)}<span>/</span>{(duration/60).toFixed(2)}</p> 
                                <p>{Math.floor(percent)} <span>%</span></p>
                        </div>
                        <div className={classes.Controls}>
                                <button className={classes.Button} onClick={()=>playSong()}>
                                    {play?<FontAwesomeIcon icon={faPauseCircle} className={iconClass}/>
                                    :<FontAwesomeIcon icon={faPlayCircle} className={iconClass}/>}</button>
                                <button className={classes.Button} onClick={()=>playStop()}>
                                    <FontAwesomeIcon icon={faStopCircle} className={iconStopclass.join(' ')}  onClick={() => setFade("stop")}
                                    onAnimationEnd={() => setFade("")}/></button>
                                <button className={classes.Button} onClick={()=>VolumeMute()}>
                                    {mute?<FontAwesomeIcon icon={faVolumeUp} className={iconClass}/>
                                    :<FontAwesomeIcon icon={faVolumeMute} className={iconClass}/>}
                                </button>
                                <button className={classes.Button} onClick={()=>VolumeControl("up")}>
                                    <FontAwesomeIcon icon={faPlus} className={iconUpclass.join(' ')}  onClick={() => setFade("up")}
                                    onAnimationEnd={() => setFade("")}/></button>
                                <button className={classes.Button} onClick={()=>VolumeControl("down")}>
                                    <FontAwesomeIcon icon={faMinus} className={iconDownclass.join(' ')}  onClick={() => setFade("down")}
                                    onAnimationEnd={() => setFade("")}/></button>
                        </div>
                        <div className={classes.SeekBar}>   
                        <SeekBar seek={percent.toFixed(3)} seekPos={setPosition} duration={duration}/>
                        </div>
                
                    <audio id="audio_player" preload='metadata'
                        onLoadedMetadata={event => {setTime(event.target.duration)}} 
                        onTimeUpdate={(event)=>{
                                setCurrenttime(event.target.currentTime);
                                const perc= event.target.currentTime/duration;
                                setPercent(perc*100)
                                if(event.target.currentTime===duration){
                                    playStop()}
                        }}>
                        <source id="src_mp3" type="audio/mp3"  preload="metadata" src={mp3_file}/>
                    </audio>
                 </div>
                 
        </div>)
}


export default Audio;

/*<br></br>
<input type="range" id='seek' 
                              style={styleInput}
                              onInput={(event)=>setPosition(event.target.value)} 
                                value={currenttime} max={duration} readOnly></input>

<progress id='seek' value={currenttime} max={duration}></progress> */