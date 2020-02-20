import React from 'react';
import classes from './Seekbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
const SeekBar = (props) =>{

const getPos= (event)=>{
    let PosX = event.nativeEvent.offsetX;
    let width = event.target.clientWidth;
    let position = (PosX/width)*props.duration;
    props.seekPos(position);
}


return (
<div className={classes.Seek}>
<div className={classes.progressbar} onClick={(event)=>getPos(event)} style={{width: `100%`}}>
<div className={classes.progress} style={{width: `${props.seek}%`}}></div>
<FontAwesomeIcon icon={faCircle} className={classes.Icon}/>
</div>
</div>
);
}

export default SeekBar;