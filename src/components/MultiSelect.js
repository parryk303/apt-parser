import React, { useState } from 'react'
import Select from 'react-select'

const MultiSelect = (props) => {
  const [values, setValues] = useState([])
  const handleChange = (selected) => {
    if (selected.length > 1) {
      selected = selected.filter((i) => i.value !== '')
      setValues(selected)
      // eslint-disable-next-line react/prop-types
      props.handleChange(selected)
    } else {
      setValues(selected)
      // eslint-disable-next-line react/prop-types
      props.handleChange(selected)
    }
  }
  return (
    <>
      <Select
        name="form-field-name2"
        // eslint-disable-next-line react/prop-types
        value={props.value && values.length === 0 ? props.value : values}
        // eslint-disable-next-line react/prop-types
        options={props.options}
        onChange={handleChange}
        isMulti
      />
    </>
  )
}

export default MultiSelect
