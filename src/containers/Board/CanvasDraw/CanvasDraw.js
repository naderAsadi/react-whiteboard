import React, { Component } from "react";
import moment from 'moment';

export default class extends Component {
  static defaultProps = {
    loadTimeOffset: 5,
    brushSize: 6,
    brushColor: "#444",
    canvasWidth: 1000,
    canvasHeight: 1000,
    disabled: false
  };

  constructor(props) {
    super(props);

    this.isMouseDown = false;
    this.linesArray = [];
    this.timeLine = [];
    this.startDrawIdx = [];
    this.timeoutValidity = 0;
    this.oldDate=moment();
  }

  getSaveData = () => {
    const saveData = {
      linesArray: this.linesArray,
      timeLine: this.timeLine,
      width: this.props.canvasWidth,
      height: this.props.canvasHeight
    };
    return JSON.stringify(saveData);
  };

  loadSaveData = (saveData, immediate) => {
    try {
      if (typeof saveData !== "string") {
        throw new Error("saveData needs to be a stringified array!");
      }
      // parse first to catch any possible errors before clear()
      const { linesArray,timeLine, width, height } = JSON.parse(saveData);

      if (!linesArray || typeof linesArray.push !== "function") {
        throw new Error("linesArray needs to be an array!");
      }

      // start the load-process
      this.clear();

      if (
        width === this.props.canvasWidth &&
        height === this.props.canvasHeight
      ) {
        this.linesArray = linesArray;
        this.timeLine=timeLine;
      } else {
        // we need to rescale the lines based on saved & current dimensions
        const scaleX = this.props.canvasWidth / width;
        const scaleY = this.props.canvasHeight / height;
        const scaleAvg = (scaleX + scaleY) / 2;

        this.linesArray = linesArray.map(line => ({
          ...line,
          endX: line.endX * scaleX,
          endY: line.endY * scaleY,
          startX: line.startX * scaleX,
          startY: line.startY * scaleY,
          size: line.size * scaleAvg
        }));
      }

      this.redraw(immediate);
    } catch (err) {
      throw err;
    }
  };

  redraw = immediate => {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight);
    }

    this.timeoutValidity++;
    const timeoutValidity = this.timeoutValidity;
    this.linesArray.forEach((line, idx) => {
      let time=0;
      if(idx!==0 || idx!==1 ||idx!==2 || idx!==3){
        time=this.timeLine[idx];
      }

      if (!immediate) {
        window.setTimeout(
          () => {
            if (timeoutValidity === this.timeoutValidity) {
              console.log('drawTIME:'+time)
              this.drawLine(line);
            }
          },
          time
        );
      } else {
        this.drawLine(line);
      }
    });
  };

  getMousePos = e => {
    const rect = this.canvas.getBoundingClientRect();

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  clear = () => {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight);
    }
    this.timeoutValidity++;
    this.linesArray = [];
    this.timeLine=[];
    this.startDrawIdx = [];
  };

  undo = () => {
    if (this.startDrawIdx.length > 0) {
      this.linesArray.splice(
        this.startDrawIdx.pop()
      );
      this.redraw(true);
      return true;
    }
    return false;
  };

  drawLine = line => {
    if (!this.ctx) return;

    this.ctx.strokeStyle = line.color;
    this.ctx.lineWidth = line.size;
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(line.startX, line.startY);
    this.ctx.lineTo(line.endX, line.endY);
    this.ctx.stroke();
  };

  drawStart = e => {
    this.isMouseDown = true;
    this.startDrawIdx.push(this.linesArray.length);

    const { x, y } = this.getMousePos(e);
    this.x = x;
    this.y = y;

    this.draw(e);
  };

  drawEnd = () => {
    this.isMouseDown = false;
  };

  draw = e => {
    if (!this.isMouseDown || this.props.disabled) return;

    const { x, y } = this.getMousePos(e);

    const newX = x + 1;
    const newY = y + 1;

    const line = {
      color: this.props.brushColor,
      size: this.props.brushSize,
      startX: this.x,
      startY: this.y,
      endX: newX,
      endY: newY
    };

    this.drawLine(line);

    const d=moment()

    const diff = d.diff(this.oldDate);
    
    const diffDuration = moment.duration(diff);

    this.linesArray.push(line);

    this.timeLine.push(diff);

    if (typeof this.props.onChange === "function") {
      this.props.onChange(this.linesArray);
    }

    this.x = newX;
    this.y = newY;
  };

  render() {
    return (
      <canvas
        width={this.props.canvasWidth}
        height={this.props.canvasHeight}
        style={{
          display: "block",
          background: "#fff",
          touchAction: "none",
          ...this.props.style
        }}
        ref={canvas => {
          if (canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
          }
        }}
        onMouseDown={this.drawStart}
        onClick={() => false}
        onMouseUp={this.drawEnd}
        onMouseOut={this.drawEnd}
        onMouseMove={this.draw}
        onTouchStart={this.drawStart}
        onTouchMove={this.draw}
        onTouchEnd={this.drawEnd}
        onTouchCancel={this.drawEnd}
      />
    );
  }
}