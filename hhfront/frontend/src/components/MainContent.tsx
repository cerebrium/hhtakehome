import React, { useEffect, useState } from 'react'
import { 
  selectColorList
} from '../features/colorsList/colorSlice'
import {
  selectedColor,
  selectColor
} from '../features/selectedColor/selectedColorSlice'
import { useSelector, useDispatch  } from 'react-redux';
import { ColorObject } from '../types'

const MainContent = () => {
  const dispatch = useDispatch();

  // create redux selectors
  const colorList = useSelector(selectColorList)
  const mainColor = useSelector(selectedColor)

  // local state for rendering
  const [colorBox, setColorBox] = useState<JSX.Element>()
  const [localColorList, setLocalColorList] = useState<Array<ColorObject>>([])
  const [smallColorBoxes, setSmallColorBoxes] = useState<Array<JSX.Element>>([])
  

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

  // render main color switch
  useEffect(() => {
    if (mainColor) {
      setColorBox(
        <div
          style={{
            backgroundColor: `${mainColor.color}`
          }}
          className='mainColorBox'
        >
          <div className='mainColorBoxLabel'>
            <h3>{mainColor.name}</h3>
          </div>
        </div>
      )
    } else {
      let mappedColorItems = localColorList.map((item, itemId) => {
        return (
          <div
            style={{
              backgroundColor: `${item.color}`
            }}
            className='smallColorBox'
            key={itemId}
            onClick={(e) => handleSelectColor(e, item)}
          >
            <div className='smallColorBoxLabel'>
              <h3>{item.name}</h3>
            </div>
          </div>
        )
      })
      setSmallColorBoxes(mappedColorItems)
    }
  }, [mainColor, localColorList])

  return (
    <div className="mainContentContainer">
      <div className='mainBoxContainer'>
        {colorBox ? colorBox : smallColorBoxes}
      </div>
    </div>
  )
}

export default MainContent