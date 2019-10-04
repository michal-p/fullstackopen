import React from 'react'

const Filter = ({newFilter, handleFilter}) => <input value={newFilter} onChange={handleFilter} />

export default Filter