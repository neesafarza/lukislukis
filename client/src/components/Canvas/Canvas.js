import React, {useEffect, useState} from 'react';
import styles from './Canvas.module.scss';
import {fabric} from 'fabric'
import Tools from "../Tools/Tools"



function Canvas () {
    const [canvas, setCanvas] = useState({})



     const initCanvas = () => {
            return new fabric.Canvas('main-canvas', {
            preserveObjectStacking: true,
            height: 600,
            width: 800,
            backgroundColor: 'cyan',
            isDrawingMode: true,
        });
    }

    useEffect( () => {
        setCanvas(initCanvas())
    }, [])

    const save = () => {
        console.log(canvas.toJSON());
        // send to api service for backend save call
    }


    return (
        <div className={styles.Canvas} data-testid="Canvas">
            <canvas style={{border: 'so lid 1px #eee'}} id='main-canvas'>
            </canvas>
            <div className={'toolbox'}>
                <Tools canvas={canvas}/>
            </div>
            <button className={styles.saveButton} onClick={save}>save</button>
        </div>
    )
}

Canvas.propTypes = {};

Canvas.defaultProps = {};

export default Canvas;
