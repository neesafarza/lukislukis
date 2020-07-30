import React, {useEffect, useState} from 'react';
import styles from './Tools.module.scss';
import {fabric} from 'fabric'
import {BrushTypes} from "../../domain/brushTypes";

function Tools ({canvas}) {

    const [brushSize, setBrushSize] = useState(1)
    const [color, setColor] = useState('black')
    const [drawingMode, setDrawingMode] = useState(true)

    const changeColor = ({target}) => {
        setColor(() => target.value)
    }

    const changeBrushSize = ({target}) => {
        setBrushSize( () => {
            return parseInt(target.value, 10) || 1
        })
    }

    const toggleDrawingMode = () => {
        setDrawingMode(!drawingMode);
    }

    useEffect(() => {
        if(canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.width = brushSize
            canvas.freeDrawingBrush.color = color;
            canvas.isDrawingMode = drawingMode;
        }
    }, [canvas.freeDrawingBrush, brushSize, color, canvas.isDrawingMode, drawingMode])

    const changeBrushType = (e) => {
        if (e.target.value === BrushTypes.BUBBLES) {
            canvas.freeDrawingBrush = new fabric.CircleBrush(canvas)
        }
        if (e.target.value === BrushTypes.SPRAY) {
            canvas.freeDrawingBrush = new fabric.SprayBrush(canvas)
        }
        if (e.target.value === BrushTypes.PENCIL) {
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
        }
        canvas.freeDrawingBrush.width = brushSize;
        canvas.freeDrawingBrush.color = color;
        canvas.isDrawingMode = drawingMode;
    }

    const addRectangle = () => {
        setDrawingMode(false);
        const rect = new fabric.Rect();
        rect.set('fill', 'red');
        rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
        rect.set('angle', 15).set('flipY', true);
        rect.set({ width: 100, height: 80, fill: '#f55' });
        rect.set('selectable', true);
        canvas.add(rect).setActiveObject(rect);
    }

    const addTriangle = () => {
        setDrawingMode(false);
        const triangle = new fabric.Triangle();
        triangle.set('fill', 'red');
        triangle.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
        triangle.set('angle', 15).set('flipY', true);
        triangle.set({ width: 100, height: 80, fill: '#f55' });
        triangle.set('selectable', true);
        canvas.add(triangle).setActiveObject(triangle);
    }

    const addCircle = () => {
        setDrawingMode(false);
        const circle = new fabric.Circle();
        circle.set('fill', 'red');
        circle.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
        circle.set('angle', 15).set('flipY', true);
        circle.set({ radius: 100, height: 80, fill: '#f55' });
        circle.set('selectable', true);
        canvas.add(circle).setActiveObject(circle);
    }

    return (
        <div>
            <button onClick={toggleDrawingMode}>{drawingMode ? 'Exit' : 'Start'} drawing mode</button>
            <input type={'range'} min={1} max={100} onChange={changeBrushSize}/>
            <input type={'color'} onChange={changeColor}/>
            <button onClick={changeBrushType} value={BrushTypes.BUBBLES}>bubbles</button>
            <button onClick={changeBrushType} value={BrushTypes.SPRAY}>spray</button>
            <button onClick={changeBrushType} value={BrushTypes.PENCIL}>pencil</button>
            <button onClick={addRectangle}>rectangle</button>
            <button onClick={addTriangle}>Triangle</button>
            <button onClick={addCircle}>Circle</button>



        </div>
    )

}



export default Tools;
