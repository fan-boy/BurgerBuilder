import React from 'react'
import classes from '../Backdrop/Backdrop.css'

const backdrop = (props) =>(

    props.show ? <div className = {classes.Backdrop} onClick = {props.backDropClicked}></div> : null
);




export default backdrop;