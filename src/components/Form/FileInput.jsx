import React from "react"
export const FileInput = ({ name, src,...props }) => {
  return (
    <label className="warperFileBox" htmlFor={name}>
      {<img src={src} alt={name} style={{border:"1px solid #ddd"}}/>}
      <input
        style={{
          display: "none",
        }}
        onChange={props.onChange}
        id={name}
        name={name}
        multiple={false}
        type="file"
        accept="image/png,image/jpeg"
      />
    </label>
  )
}
