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
  const [smallColorBoxes, setSmallColorBoxes] = useState<JSX.Element>()
  const [toggleMenu, setToggleMenu] = useState<JSX.Element>()

  // handling the scroll
  const [currentPage, setCurrentPage] = useState<number>(1)
  

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
    dispatch(selectColor(selectedColor))
  }

  // function for changing the page
  const handleSelectPage = (e: any, i: number) => {
    setCurrentPage(i)
  }

  // render main color switch
  useEffect(() => {
    let amountOfData = 0
    if (mainColor !== null) {
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
        if (itemId < currentPage * 16 && itemId > currentPage * 16 - 16) {
          amountOfData++
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
        } else {
          amountOfData++
        }
      })
      let pageChangeArray = []
      for (let i = 1; i <= Math.ceil(amountOfData / 16); i++) {
        if (i === currentPage) {
          pageChangeArray.push(
            <h3 onClick={(e) => handleSelectPage(e, i)} id='selectedPage'>
              {i}
            </h3>
          )
        } else {
          pageChangeArray.push(
            <h3 onClick={(e) => handleSelectPage(e, i)}>
              {i}
            </h3>
          )
        }
      }
      setColorBox(undefined)
      setSmallColorBoxes(
        <div className='smallListContainer'>
          <div className='smallItems'>
            {mappedColorItems}
          </div>
          <div className='pageChangerContainer'>
            {pageChangeArray}
          </div>
        </div>
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainColor, localColorList, currentPage])

  // function to remove selected color
  const handleRemoveSelectedColor = () => {
    dispatch(selectColor(null))
  }

  // add the toggle menu
  useEffect(() => {
    if (colorBox !== undefined) {
      setToggleMenu(
        <div className='toggleMenuContainer' onClick={ handleRemoveSelectedColor}>
          <div className='firstLine'></div>
          <div className='secondLine'></div>
          <div className='thirdLine'></div>
        </div>
      )
    } else {
      setToggleMenu(
        <div className='toggleMenuContainerList'>
          <div className='firstLineMenu'></div>
          <div className='secondLineMenu'></div>
          <div className='thirdLineMenu'></div>
        </div>
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorBox])

  return (
    <div className="mainContentContainer">
      <div className='mainBoxContainer'>
        {toggleMenu}
        {colorBox ? colorBox : smallColorBoxes}
      </div>
    </div>
  )
}

export default MainContent