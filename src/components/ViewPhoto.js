import React from 'react'
import { GetPhotoSrc } from '../db'

const ViewPhoto = (props) => {
    const photoSrc = GetPhotoSrc(props.id)
  return (
    <>
        <div>
            <img src={photoSrc} alt={props.name}/>
        </div>
    </>
  )
}

export default ViewPhoto