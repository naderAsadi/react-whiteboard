import React,{Component} from 'react';
import moment from 'moment';
import SaveIcon from '@material-ui/icons/Save'
import LoadIcon from '@material-ui/icons/Refresh'
import StopIcon from '@material-ui/icons/Stop'
import PlayIcon from '@material-ui/icons/PlayArrow'
import PenIcon from '@material-ui/icons/Create';
import ListItem from '@material-ui/core/ListItem';

import CanvasDraw from './CanvasDraw/CanvasDraw';
import {ReactMic} from 'react-mic';


import classes from './Board.css';
import { isMoment } from 'moment';

class Board extends Component{
    constructor(props){
        super(props);
        console.log(this.props.width)
        console.log(this.props.height)
        this.state={
            toolsOpen:false,
            brushColor:"#000",
            brushSize:4,
            color: "#ffc600",
            width: this.props.width,
            height: this.props.height,
            disabled:true,
            record: false,
            blobObject: null,
            isRecording: false,
            startTime: false
        };
      }
    
      saveCanvas=(blobObject)=>{

        localStorage.setItem(
            "savedDrawing",
            this.saveableCanvas.getSaveData()
        );
    
        this.saveableCanvas.clear();
    
        this.setState({
            disabled:true
        });
      }
    
      restoreCanvas=()=>{
        var audio=new Audio(this.state.blobURL);
        audio.load();
        audio.volume=0.5;
        audio.play();

        this.loadableCanvas.loadSaveData(
            localStorage.getItem("savedDrawing")
        );
        
        this.setState({disabled:false});
      }
    
      startRecording= () => {
        this.setState({
          record: true,
          isRecording: true,
          disabled:false,
          startTime: true
        });
      }
    
      stopRecording= () => {
        this.setState({
          record: false,
          isRecording: false,
          disabled:true
        });
      }
    
      onStop= (blobObject) => {
        this.setState({
          blobURL : blobObject.blobURL
        });
      }

      onToolsOpen=()=>{
          console.log(this.state.toolsOpen)
          this.setState({
            toolsOpen: !this.state.toolsOpen
          })
      }

      onPenSizeChange=(value)=>{
        this.setState({brushSize:value})
      }
    


    render(){

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
        let toolsClasses=[classes.toolsettings,classes.toolsClose];
        let toolClasses=classes.toolIcon
        if(this.state.toolsOpen){
            toolsClasses=[classes.toolsettings,classes.toolsOpen];
            toolClasses=classes.toolSelected;
        }
        
        return(
            <div>
                <table >
                    <tbody>
                    <tr>
                        <td>
                            <div style={{width:'70px',height:'320px' ,marginLeft:'20px'}}>
                                <div className={classes.Tools}>
                                    <div className="">
                                        <ListItem onClick={this.onToolsOpen} className={classes.Tool}>
                                            <PenIcon className={toolClasses}/>
                                            <div className={toolsClasses.join(' ')}  >
                                                <div className={classes.colorPicker}>
                                                    <span>
                                                        <div className={classes.colorItem} >
                                                            <span>
                                                                <div  className={classes.colorInside} style={{backgroundColor:"#000"}} onClick={()=>{this.setState({brushColor:"#000"})}} />
                                                            </span>
                                                        </div>
                                                    </span>
                                                    <span>
                                                        <div className={classes.colorItem} >
                                                            <span>
                                                                <div  className={classes.colorInside} style={{backgroundColor:"#f44336"}} onClick={()=>{this.setState({brushColor:"#f44336"})}} />
                                                            </span>
                                                        </div>
                                                    </span>
                                                    <span>
                                                        <div className={classes.colorItem}>
                                                            <span >
                                                                <div  className={classes.colorInside} style={{backgroundColor:"#2196f3"}} onClick={()=>{this.setState({brushColor:"#2196f3"})}} />
                                                            </span>
                                                        </div>
                                                    </span>
                                                    <span>
                                                        <div className={classes.colorItem}>
                                                            <span >
                                                                <div  className={classes.colorInside} style={{backgroundColor:"#8bc34a"}} onClick={()=>{this.setState({brushColor:"#8bc34a"})}}/>
                                                            </span>
                                                        </div>
                                                    </span>
                                                    <span>
                                                        <div className={classes.colorItem}>
                                                            <span >
                                                                <div  className={classes.colorInside} style={{backgroundColor:"#fdd835"}} onClick={()=>{this.setState({brushColor:"#fdd835"})}}/>
                                                            </span>
                                                        </div>
                                                    </span>
                                                    
                                                </div>
                                                <hr></hr>
                                            </div>
                                        </ListItem>
                                        <ListItem className={classes.Tool} onClick={this.startRecording}>
                                            <PlayIcon style={{color:'#8f8f8f'}}/>
                                        </ListItem >
                                        <ListItem className={classes.Tool} onClick={this.stopRecording}>
                                            <StopIcon style={{color:'#8f8f8f'}}/>
                                        </ListItem >
                                        <ListItem className={classes.Tool} onClick={this.saveCanvas}>
                                            <SaveIcon style={{color:'#8f8f8f'}}/>
                                        </ListItem>
                                        <ListItem className={classes.Tool} onClick={this.restoreCanvas}>
                                            <LoadIcon style={{color:'#8f8f8f'}}/>
                                        </ListItem>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div >
                                <div >
                                    <div>
                                        <CanvasDraw
                                            disabled={this.state.disabled}
                                            ref={(canvasDraw)=>{
                                                if(this.state.disabled){
                                                    return(this.loadableCanvas=canvasDraw)
                                                }else{
                                                    return(this.saveableCanvas=canvasDraw)
                                                }
                                            }}
                                        canvasWidth={window.innerWidth-115}
                                        canvasHeight={window.innerHeight-80}
                                        brushColor={this.state.brushColor}
                                        startTime={moment()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div style={{display:'none'}}>
                <ReactMic
                        className="oscilloscope"
                        record={this.state.record}
                        audioBitsPerSecond= {128000}
                        onStop={this.onStop}
                        onStart={this.onStart}
                        style={{display:'none'}}/></div>
                   
                <div style={{display:'flex'}}>
                    <div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;