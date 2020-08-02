import React, { useEffect, useState } from "react";
import styles from "./Canvas.module.scss";
import { fabric } from "fabric";
import Tools from "../Tools/Tools";
import ApiService from "../../ApiService";

const MAX_SIZE = 5_000_000;

function Canvas({ name, setName, socket }) {
  const [canvas, setCanvas] = useState({});
  const [id, setId] = useState("");
  const [lock, setLock] = useState({});

  const isDisabled = () => {
    return lock.name !== name && lock.name !== undefined;
  };

  const initCanvas = () => {
    return new fabric.Canvas("main-canvas", {
      preserveObjectStacking: true,
      height: 600,
      width: 800,
      backgroundColor: "cyan",
      isDrawingMode: true,
    });
  };

  useEffect(() => {
    socket.emit("getLocks");
    socket.on("locks", (data) => {
      setLock(data);
      if (Object.keys(canvas).length > 0) {
        if (data.name && data.name !== name) {
          canvas.isDrawingMode = false;
          canvas.forEachObject((obj) => (obj.selectable = false));
        } else {
          canvas.isDrawingMode = true;
          canvas.forEachObject((obj) => (obj.selectable = true));
        }
      }
    });
  }, [lock]);

  useEffect(() => {
    socket.on("connection", (data) => setId(data));
    socket.on("saving", (data) => {
      if (Object.keys(canvas).length > 1) {
        canvas.loadFromJSON(JSON.parse(data.data), () => {
          setCanvas(canvas);
          canvas.renderAll();
        });
      }
    });
  }, [canvas]);

  useEffect(() => {
    ApiService.getResource("main-canvas")
      .then((res) => {
        res
          .json()
          .then((data) => {
            setId(data._id);
            if (data.canvasData) {
              const importCanvas = initCanvas();
              importCanvas.loadFromJSON(data.canvasData, () => {
                setCanvas(importCanvas);
                importCanvas.renderAll();
              });
            } else {
              setCanvas(initCanvas());
            }
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const save = () => {
    if (canvas && JSON.stringify(canvas.toJSON()).length < MAX_SIZE) {
      const body = {
        _id: id,
        canvasData: JSON.stringify(canvas.toJSON()),
      };
      ApiService.createResource("canvas", body, "PUT")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      socket.emit("save", {
        data: JSON.stringify(body.canvasData),
        id,
      });
    } else {
      alert("Your canvas is too big!!");
    }
  };

  const clear = () => {
    canvasLock();
    canvas.clear();
  };

  const logout = () => {
    socket.emit("leave");
    setName("");
  };

  const canvasLock = () => {
    if (!lock.name) {
      socket.emit("lock", name);
    }
  };

  return (
    <div className={styles.Canvas} data-testid="Canvas">
      <div className={styles.appHeader}>
      <p>Hello {name}</p>
      <button onClick={logout}>Logout</button>
      </div>
      
      <div className={styles.canvasContainer}>
        <div onClick={canvasLock}>
          <canvas
            style={{ border: "so lid 1px #eee" }}
            id="main-canvas"
          ></canvas>
        </div>
        <div className={"toolbox"}>
          <Tools canvas={canvas} />
        </div>
      </div>

      <button
        className={styles.saveButton}
        disabled={isDisabled()}
        onClick={save}
      >
        save
      </button>
      <button
        className={styles.clearButton}
        disabled={isDisabled()}
        onClick={clear}
      >
        clear
      </button>

      <div>lockby {lock.name}</div>
    </div>
  );
}

Canvas.propTypes = {};

Canvas.defaultProps = {};

export default Canvas;
