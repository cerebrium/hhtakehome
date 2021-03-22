import React, { useEffect, useState } from 'react'
import { 
  selectColorList,
  addColors
} from '../features/colorsList/colorSlice'
import { useSelector } from 'react-redux';
import { ColorObject } from '../types'

const MainContent = () => {
  // create redux selectors
  const colorList = useSelector(selectColorList)

  // local state for rendering
  const [colorBoxArray, setColorBoxArray] = useState<Array<JSX.Element>>([])
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

  return (
    <div className="mainContentContainer">
      {colorBoxArray}
    </div>
  )
}

export default MainContent