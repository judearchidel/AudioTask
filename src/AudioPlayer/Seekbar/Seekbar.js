import React from 'react';
import classes from './Seekbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
const SeekBar = (props) =>{
  
    const myref = React.createRef();
/*
const getPos= (event)=>{
    let PosX = event.nativeEvent.offsetX;
    let width = event.target.clientWidth;
    let position = (PosX/width)*props.duration;
    if(position!==Infinity && position!==0){
    props.seekPos(position);
    }
}
   */
    


const dragStart = (e)=> {
    e.preventDefault();
    var dragItem = document.getElementById("item");
    var container = document.getElementById("progress");
    dragItem.draggable = true;
    container.addEventListener("mousemove", drag);
    container.addEventListener("mouseup", dragEnd);
  }


  const dragEnd=(e) => {
      e.preventDefault()
      var container = document.getElementById("progress");
      container.removeEventListener("mousemove",drag);
      container.removeEventListener("mousedown",dragStart);
     if(e.offsetX)
      {let width = container.clientWidth;
    let position = (e.offsetX/width)*props.duration;
    if(position!==Infinity && position!==0){
    props.seekPos(position);}
    }
}

    const dragEndOutside=(e) => {
        e.preventDefault();
        var container = document.getElementById("progress");
        container.removeEventListener("mousemove",drag);
        container.removeEventListener("mousedown",dragStart);
      }
  
    
  

  const drag=(e)=> {
      e.preventDefault();
      var container = document.getElementById("progress");
    let width = container.clientWidth;
console.log(e)
    let position = (e.offsetX/width)*props.duration;

    if(position!==Infinity && position!==0){
    props.seekPos(position);
    
    document.addEventListener("mouseup", dragEndOutside);
  }

 
  //  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }


return (
<div className={classes.Seek}>
<div className={classes.progressbar} id ='progress'  style={{width: `100%`}}
onMouseDown={(e)=>dragStart(e)} onMouseUp={(event)=>dragEnd(event)}>
<div className={classes.progress} id='item' style={{width: `${props.seek}%`}}   ></div>
<span ref={myref} ><FontAwesomeIcon icon={faCircle} className={classes.Icon}/></span>
</div>
</div>
);
}

export default SeekBar;