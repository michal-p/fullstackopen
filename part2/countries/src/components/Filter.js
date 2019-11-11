import React from 'react'

const Filter = ({value, handler}) => {

  return (
    <>
      <label>Search: </label>
      <input value={value} onChange={handler}/>
    </>
  )
}

export default Filter