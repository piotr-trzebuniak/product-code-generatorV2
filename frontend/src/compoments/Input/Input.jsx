import React from 'react'
import style from './Input.module.scss'

const Input = ({className, name, placeholder, value, onChange}) => {

  const classNames  = `${className} ${style.input}`

  return (
    <input className={classNames} name={name} placeholder={placeholder} value={value} onChange={onChange} />
  )
}

export default Input