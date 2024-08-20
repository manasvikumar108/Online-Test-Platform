import React from 'react'
import './Header.css'

export const Header = (props) => {
  return (
    <>
        <div >
            <p id='heading'>{props.text}</p>
        </div>
    </>
  )
}
