import React, { useEffect, useState } from "react"
import { 
  selectColorList
} from '../features/colorsList/colorSlice'
import {
  selectColor
} from '../features/selectedColor/selectedColorSlice'
import { useSelector, useDispatch } from 'react-redux';
import { ColorObject } from '../types'

const LeftSection = () => {
  // create redux selectors
  const colorList = useSelector(selectColorList)
  
  // allow for selecting a color
  const dispatch = useDispatch();

  // local state for rendering
  const [colorNameArray, setColorNameArray] = useState<Array<JSX.Element>>([])

  // dispatch the selected color to redux
  const handleSelectColor = (e: React.SyntheticEvent, selectedColor: ColorObject) => {
    e.preventDefault()
    dispatch(selectColor(selectedColor))
  }
  
  // map the items into a rendered array - when the sort changes on main page this updates
  useEffect(() => {
    let localRenderArray: Array<JSX.Element> = []
  
    colorList.forEach(item => {
      if (item.name !== 'Black') {
        localRenderArray.push(
          <div
            key={item._id}
            className='colorLabel'
            onClick={(e) => handleSelectColor(e, item)}
          >
            <h3>{item.name}</h3>
          </div>
        )
      }
    })
    setColorNameArray(localRenderArray)
  }, [colorList])

  // select a random color
  const handleRandomSelection = () => {
    let maxNumber = colorList.length
    if (colorList[Math.floor(Math.random() * Math.floor(maxNumber))]) {
      dispatch(selectColor(colorList[Math.floor(Math.random() * Math.floor(maxNumber))]))
    }
  }
  
  return (
    <div className="leftSelectionContainer">
      <button onClick={ handleRandomSelection}>
        Random Color
      </button>
      <div className='namesContainer'>
        {colorNameArray}
      </div>
    </div>
  )
}

export default LeftSection