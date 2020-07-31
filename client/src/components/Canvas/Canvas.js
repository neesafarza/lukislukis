import React, {useEffect, useState} from 'react';
import styles from './Canvas.module.scss';
import {fabric} from 'fabric'
import Tools from "../Tools/Tools"
import ApiService from "../../ApiService";
import io from 'socket.io-client';

const MAX_SIZE = 5_000_000

const socket = io('http://localhost:4000');

function Canvas () {
    const [canvas, setCanvas] = useState({})
    const [id, setId] = useState('')


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
        socket.on('connection', (data) => setId(data))
        socket.on('saving', (data) => {
            if(Object.keys(canvas).length > 1) {
                canvas.loadFromJSON(JSON.parse(data.data), () => {
                    setCanvas(canvas);
                    canvas.renderAll();
                })
            }
        })
        
    }, [canvas])

    useEffect(() => {
        ApiService.getResource('main-canvas')
            .then(res => {
                res.json().then((data) => {
                    setId(data._id)
                    if(data.canvasData) {
                        const importCanvas = initCanvas();
                         importCanvas.loadFromJSON(data.canvasData, () => {
                             setCanvas(importCanvas);
                             importCanvas.renderAll();
                         })
                    } else {
                        setCanvas(initCanvas());
                    }
                }).catch((err) => {
                    console.error(err);
                })
            }).catch((err) => {
                console.error(err);
        });
    },[]);

    const save = () => {
        if(canvas && JSON.stringify(canvas.toJSON()).length < MAX_SIZE) {
            const body = {
                _id: id,
                canvasData: JSON.stringify(canvas.toJSON()),
            }
            ApiService.createResource('canvas', body, 'PUT')
                .then(res => console.log(res))
                .catch(err => console.log(err))
                socket.emit('save', {
                    data: JSON.stringify(body.canvasData),
                    id,
                })
        }   else {
            alert('Your canvas is too big!!')
        }
    }

    const clear = () => {
        canvas.clear();
    }

    return (
        <div className={styles.Canvas} data-testid="Canvas">
            <canvas style={{border: 'so lid 1px #eee'}} id='main-canvas'>
            </canvas>
            <div className={'toolbox'}>
                <Tools canvas={canvas}/>
            </div>
            <button className={styles.saveButton} onClick={save}>save</button>
            <button className={styles.clearButton} onClick={clear}>clear</button>

        </div>
    )
}

Canvas.propTypes = {};

Canvas.defaultProps = {};

export default Canvas;
