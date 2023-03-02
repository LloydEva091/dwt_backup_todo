import React, { useEffect, useRef, useState, useCallback } from "react";
import "reactjs-popup/dist/index.css";
import Webcam from "react-webcam";
import { addPhoto } from "../db.js";

const WebcamCapture = (props) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgId, setImgId] = useState(null);
  const [photoSave, setPhotoSave] = useState(false);

  useEffect(() => {
    if (photoSave) {
      console.log("useEffect detected photoSave");
      props.photoedTask(imgId);
      setPhotoSave(imgId);
    }
  },[photoSave] );

  const capture = useCallback((id) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log("capture", imageSrc.length, id);
  }, [webcamRef, setImgSrc]);

  const savePhoto = (id, imgSrc) => {
    console.log("savePhoto", imgSrc.length, id);
    addPhoto(id, imgSrc);
    setImgId(id);
    setPhotoSave(true);
  };

  const cancelPhoto = (id, imgSrc) => {
    console.log("cancelPhoto", imgSrc.length, id);
  };

  return (
    <>
        {!imgSrc && (<Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
        ></Webcam>)}
        {imgSrc && (
            <img 
                src={imgSrc}
                alt={props.name}
            />
        )}
        <div className='btn-group'>
            {!imgSrc && (
                <button 
                    type="button"
                    className="btn"
                    onClick={()=>capture(props.id)}
                >
                    Capture Photo
                </button>
            )}
            {imgSrc && (
                <button
                    type="button"
                    className="btn"
                    onClick={()=>savePhoto(props.id,imgSrc)}
                >   
                    Save Photo
                </button>
            )}
            {imgSrc && (
                <button
                    type="button"
                    className="btn"
                    onClick={()=>cancelPhoto(props.id,imgSrc)}
                >
                    Cancel
                </button>
            )}
        </div>
    </>
  )
};


export default WebcamCapture