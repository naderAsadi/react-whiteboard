import React, { Component } from "react";
import audioRecorder from 'react-audio-recorder';

import CanvasDraw from './CanvasDraw/CanvasDraw';
import {ReactMic,saveRecording} from 'react-mic';
import classes from './Canvas.css'; 

class MyCanvas extends Component {
  constructor(props){
    super(props);
    console.log(this.props.width)
    console.log(this.props.height)
    this.state={
      color: "#ffc600",
      width: this.props.width,
      height: this.props.height,
      disabled:false,
      record: false,
      blobObject: null,
      isRecording: false
    };
  }

  saveCanvas=()=>{
    localStorage.setItem(
        "savedDrawing",
        this.saveableCanvas.getSaveData()
    );

    this.saveableCanvas.clear();

    this.setState({disabled:true});
  }

  restoreCanvas=()=>{
    this.loadableCanvas.loadSaveData(
        localStorage.getItem("savedDrawing")
    );
    this.setState({disabled:false});
  }

  startRecording= () => {
    this.setState({
      record: true,
      isRecording: true
    });
  }

  stopRecording= () => {
    this.setState({
      record: false,
      isRecording: false
    });
  }

  onStop= (blobObject) => {
    this.setState({
      blobURL : blobObject.blobURL
    });
  }

  render() {
    const styles = {
        toolbar:{
                display: 'flex',
                justifyContent: 'center',
                width: '400 px'
        },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        position: 'relative'
      },
      canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
    };

    const { isRecording } = this.state;

    return (
      <div style={{width:'500'}}>
        <div style={styles.toolbar}>
          <button
            onClick={this.saveCanvas}> Save </button>
          <button
            onClick={this.restoreCanvas}> Restore </button>
            <div>
               <label>Width:</label>
                <input
                type="number"
                value={this.state.width}
                onChange={e => this.setState({ width: e.target.value })}
                />
          </div>
          <div>
                <label>Height:</label>
                <input
                type="number"
                value={this.state.height}
                onChange={e => this.setState({ height: e.target.value })}
                />
          </div>
          <button
              disabled={isRecording}
              onClick={this.startRecording}>Record</button>
          <button
            disabled={!isRecording}
            onClick={this.stopRecording}>>
              StopRecord
          </button>
        </div> 
        <div>
          <ReactMic
            className="oscilloscope"
            record={this.state.record}
            audioBitsPerSecond= {128000}
            onStop={this.onStop}
            onStart={this.onStart}/>
          <button onClick={()=>{
                var audio=new Audio(this.state.blobURL);
                audio.load();
                audio.volume=0.5;
                audio.play();
            }}>play
          </button>
          <audio ref="audioSource" src={this.state.blobURL}></audio>
            <CanvasDraw
            disabled={this.state.disabled}
            ref={(canvasDraw)=>{
                if(this.state.disabled){
                    return(this.loadableCanvas=canvasDraw)
                }else{
                    return(this.saveableCanvas=canvasDraw)
                }
            }}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
          />
        </div>
      </div>
      
    );
  }
}

export default MyCanvas;