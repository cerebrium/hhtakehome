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
  
  const dispatch = useDispatch();

  // local state for rendering
  const [colorNameArray, setColorNameArray] = useState<Array<JSX.Element>>([])
  const [ localColorList, setLocalColorList ] = useState<Array<ColorObject>>([])

  // handle mapping the redux state into local state
  useEffect(() => {
    let localSortableArray: Array<ColorObject> = []

    // use the object deconstruction so it can be sorted later
    colorList.forEach(item => {
      localSortableArray.push(
        {...item}
      )
    })
    setLocalColorList(localSortableArray)
  }, [colorList])
  
  // dispatch the selected color to redux
  const handleSelectColor = (e: React.SyntheticEvent, selectedColor: ColorObject) => {
    e.preventDefault()
    dispatch(selectColor(selectedColor))
  }
  
  // map the items into a rendered array
  useEffect(() => {
    let localRenderArray: Array<JSX.Element> = []
  
    localColorList.sort( (a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
    localColorList.forEach(item => {
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
  }, [localColorList])
  
  return (
    <div className="leftSelectionContainer">
      <button>
        Random Color
      </button>
      <div className='namesContainer'>
        {colorNameArray}
      </div>
    </div>
  )
}

export default LeftSection