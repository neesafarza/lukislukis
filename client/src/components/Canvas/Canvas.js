import React from 'react';
import styles from './Canvas.module.scss';

import {fabric} from 'fabric'

class Canvas extends React.Component {

    componentDidMount() {
        this.initCanvas();
    }

    initCanvas() {
        this.the_canvas = new fabric.Canvas('main-canvas', {
            preserveObjectStacking: true,
            height: 600,
            width: 800,
            backgroundColor: 'red',
            isDrawingMode: true,
        });
    }

    save = () => {
        console.log(this.the_canvas.toJSON());
        // send to api service for backend save call
    }

    render() {
        return (
            <div className={styles.Canvas} data-testid="Canvas">
                <canvas style={{border: 'so lid 1px #eee'}} id='main-canvas'>
                </canvas>
                <button className={styles.saveButton} onClick={this.save}/>
            </div>
        )
    }
};

Canvas.propTypes = {};

Canvas.defaultProps = {};

export default Canvas;
