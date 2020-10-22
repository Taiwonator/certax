import React, { useRef, useEffect, useState } from 'react';
import useWindowDimensions from '../../helperFunctions/useWindowDimensions';
import './ParticleBackground.scss';

const ParticleBackground = props => {
  
    const canvasRef = useRef(null)

    let canvas = null;
    let ctx = null;
    let rcontainer = [];

    let rows;
    let columns;
    const { width } = useWindowDimensions();
    if(width > 0 && width <= 600) {
        rows = 3;
        columns = 4;
    } else {
        rows = 3;
        columns = 10;
    }
    
    const populate = (lower, upper, count) => {
        let list = []
        const step = Math.round((upper - lower) / count)
        for(var i = lower; i < upper; i += step) {
            list.push(i);
        }
        return list
    }
    let xs = populate(0, window.innerWidth, columns);
    let ys = populate(0, window.innerHeight + 150, rows);

    let xOffsetLimit = Math.round((window.innerWidth - 0) / columns) / 2;
    let yOffsetLimit = Math.round(((window.innerHeight) - 0) / rows) / 2;

    // for (var i = 0; i <= particleCount; i++) {
    //     var x = Math.random() * window.innerWidth;
    //     var y = Math.random() * window.innerHeight;
    //     var dx = (Math.random() / 25) * (window.innerWidth);
    //     var dy = (Math.random() / 25) * (window.innerHeight);
    //     var color = (Math.round(Math.random()) % 2) ? props.colors.blue : props.colors.yellow;
        
        
    //     rcontainer.push(new rectangle(x, y, dx, dy, ctx, color));
    // }

    for(var i = 0; i < xs.length; i++) {
        for(var j = 0; j < ys.length; j++) {
            var x = xs[i] + Math.floor(Math.random() * xOffsetLimit + 1); 
            var y = ys[j] + Math.floor(Math.random() * yOffsetLimit + 1);
            var dx = (Math.random() / 30) * (window.innerWidth);
            var dy = (Math.random() / 30) * (window.innerHeight)
            var color = (Math.round(Math.random()) % 2) ? props.colors.blue : props.colors.yellow;
            rcontainer.push(new rectangle(x, y, dx, dy, ctx, color));
        }
    }


    
    useEffect(() => {
      canvas = canvasRef.current
      ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let animationFrameId

      const render = () => {
        draw(ctx)
        animationFrameId = window.requestAnimationFrame(render)
      }
      render()

      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }

    }, [draw])

    const draw = (ctx) => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (var i = 0; i < rcontainer.length; i++) {
            rcontainer[i].update(ctx, props.direction, props.speed);
        }
    }
        
    return <canvas ref={canvasRef} {...props}/>
  }

  function rectangle(x, y, dx, dy, ctx, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;

    this.draw = (ctx) => {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.dx, this.dy);
        ctx.fillStyle = color;
        ctx.fill();
    }
    this.update = (ctx, direction, speed) => {
        switch(direction) {
            case 0:
                this.y -= speed;
                if(this.y <= -50) {
                    this.y = window.innerHeight + 50
                }
                break; 
            case 1:
                this.x += speed;
                if(this.x >= window.innerWidth) {
                    this.x = -50
                }
                break; 
            case 2:
                this.y += speed;
                if(this.y >= window.innerHeight) {
                    this.y = -50
                }
                break; 
            case 3:
                this.x -= speed;
                if(this.x <= -50) {
                    this.x = window.innerWidth + 50
                }
                break;
            default:
                break;
        } 
        
        this.draw(ctx);
    }
}
 
export default ParticleBackground;