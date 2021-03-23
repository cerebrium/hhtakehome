import React, { useEffect, useState } from 'react'
import { 
  selectColorList,
  addColors
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
  const [smallColorBoxes, setSmallColorBoxes] = useState<JSX.Element>()
  const [toggleMenu, setToggleMenu] = useState<JSX.Element>()
  const [sortMenuBoolean, setSortMenuBoolean] = useState<Boolean>(false)

  // handling the scroll
  const [currentPage, setCurrentPage] = useState<number>(1)

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
    function componentToHex(c: number) {
      var hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }
    
    function rgbToHex(r: number, g: number, b: number) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    let amountOfData = 0
    if (mainColor !== null) {
      setColorBox(
        // main color box
        <div className='bigColorContainer'>
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
          {/* build the variety of colors based off averaging closer to the 0 or 255 rbg. apply to all. middle is the main color. convert name to hex as per the picture  */}
          <div className='varietyColorsContainer'>
            <div
              style={{
                backgroundColor: `rgb(${mainColor.red > 0 ? mainColor.red/3 : mainColor.red}, ${mainColor.green > 0 ? mainColor.green/3 : mainColor.green}, ${mainColor.blue > 0 ? mainColor.blue/3 : mainColor.blue})`
              }}
              className='mainColorBoxMini'
            >
              <div className='miniLabelBox'>
                {rgbToHex(mainColor.red > 0 ? Math.floor(mainColor.red/3) : mainColor.red, mainColor.green > 0 ? Math.floor(mainColor.green/3) : mainColor.green, mainColor.blue > 0 ? Math.floor(mainColor.blue/3) : mainColor.blue)}
              </div>
            </div>
            <div
              style={{
                backgroundColor: `rgb(${mainColor.red > 0 ? mainColor.red/2 : mainColor.red}, ${mainColor.green > 0 ? mainColor.green/2 : mainColor.green}, ${mainColor.blue > 0 ? mainColor.blue/2 : mainColor.blue})`
              }}
              className='mainColorBoxMini'
            >
              <div className='miniLabelBox'>
                {rgbToHex(mainColor.red > 0 ? Math.floor(mainColor.red/2) : mainColor.red, mainColor.green > 0 ? Math.floor(mainColor.green/2) : mainColor.green, mainColor.blue > 0 ? Math.floor(mainColor.blue/2) : mainColor.blue)}
              </div>
            </div>
            <div
              style={{
                backgroundColor: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`
              }}
              className='mainColorBoxMini'
            >
              <div className='miniLabelBox'>
              {rgbToHex(mainColor.red, mainColor.green, mainColor.blue)}
              </div>
            </div>
            <div
              style={{
                backgroundColor: `rgb(${mainColor.red < 255 ? (mainColor.red + 255)/2 : mainColor.red}, ${mainColor.green < 255 ? (mainColor.green + 255)/2 : mainColor.green}, ${mainColor.blue < 255 ? (mainColor.blue + 255)/2 : mainColor.blue})`
              }}
              className='mainColorBoxMini'
            >
              <div className='miniLabelBox'>
                {rgbToHex(mainColor.red > 0 ? Math.floor((mainColor.red+255)/2) : mainColor.red, mainColor.green > 0 ? Math.floor((mainColor.green+255)/2) : mainColor.green, mainColor.blue > 0 ? Math.floor((mainColor.blue+255)/2) : mainColor.blue)}
              </div>
            </div>
            <div
              style={{
                backgroundColor: `rgb(${mainColor.red < 255 ? ((mainColor.red + 255)/2 + 255)/2 : mainColor.red}, ${mainColor.green < 255 ? ((mainColor.green + 255)/2 + 255)/2: mainColor.green}, ${mainColor.blue < 255 ? ((mainColor.blue + 255)/2 + 255)/2 : mainColor.blue})`
              }}
              className='mainColorBoxMini'
            >
              <div className='miniLabelBox'>
                {rgbToHex(mainColor.red > 0 ? Math.floor(((mainColor.red + 255)/2 + 255)/2) : mainColor.red, mainColor.green > 0 ? Math.floor(((mainColor.green + 255)/2 + 255)/2) : mainColor.green, mainColor.blue > 0 ? Math.floor(((mainColor.blue + 255)/2 + 255)/2) : mainColor.blue)}
              </div>
            </div>
          </div>

          {/*  clear button */}
          <button onClick={handleRemoveSelectedColor}>
            Clear
          </button>
        </div>
      )
    } else {
      // paginate the data - could be done via the backend, but seems faster with a small data set to limit the backend requests
      let mappedColorItems = colorList.map((item, itemId) => {
        if (itemId < currentPage * 12 && itemId > currentPage * 12 - 13) {
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
      for (let i = 1; i <= Math.ceil(amountOfData / 12); i++) {
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
  }, [mainColor, colorList, currentPage])

  // function to remove selected color
  const handleRemoveSelectedColor = () => {
    dispatch(selectColor(null))
  }

  // make the menu for sorting
  const handleMakeSortMenu = () => {
    sortMenuBoolean ? setSortMenuBoolean(false) : setSortMenuBoolean(true)
  }

  // sort the data and update state
  const handleSortingAndUpdating = (e: any, sortLabel: string) => {
    let localSortableList: Array<ColorObject> = []
    colorList.forEach(item => {
      localSortableList.push(
        {...item}
      )
    })
    switch (sortLabel) {
      case "Hue":
        let hueList = localSortableList.sort((a, b) => (a.hue > b.hue ? -1 : 1))
        dispatch(addColors(hueList))
        setSortMenuBoolean(false)
        break;
      case "Saturation":
        let satList = localSortableList.sort((a, b) => (a.sat > b.sat ? -1 : 1))
        dispatch(addColors(satList))
        setSortMenuBoolean(false)
        break;
      case "Luma":
        let lumaList = localSortableList.sort((a, b) => (a.luma > b.luma ? -1 : 1))
        dispatch(addColors(lumaList))
        setSortMenuBoolean(false)
        break;
      case "Red":
        let redList = localSortableList.sort((a, b) => (a.red > b.red ? -1 : 1))
        dispatch(addColors(redList))
        setSortMenuBoolean(false)
        break;
      case "Green":
        let greenList = localSortableList.sort((a, b) => (a.green > b.green ? -1 : 1))
        dispatch(addColors(greenList))
        setSortMenuBoolean(false)
        break;
      case "Blue":
        let blueList = localSortableList.sort((a, b) => (a.blue > b.blue ? -1 : 1))
        dispatch(addColors(blueList))
        setSortMenuBoolean(false)
        break;
      case "Alphabetical":
        let alphaList = localSortableList.sort((a, b) => (a.name > b.name ? 1 : -1))
        dispatch(addColors(alphaList))
        setSortMenuBoolean(false)
        break;
      default:
        break;
    }
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
      if (sortMenuBoolean) {
        setToggleMenu(
          <div className='sortMenuContainer'>
            <div className='returnToMenu' onClick={ handleMakeSortMenu}>
              X
            </div>
            <div className='sortList'>
              <h3>Sort By</h3>
              <h4 onClick={(e) => handleSortingAndUpdating(e, "Hue")}>Hue</h4>
              <h4 onClick={(e) => handleSortingAndUpdating(e, "Luma")}>Luma</h4>
              <h4 onClick={(e) => handleSortingAndUpdating(e, "Saturation")}>Saturation</h4>
              <h4 onClick={(e) => handleSortingAndUpdating(e, "Red")}>Red</h4>
              <h4 onClick={(e) => handleSortingAndUpdating(e, "Green")}>Green</h4>
              <h4 onClick={(e) => handleSortingAndUpdating(e, "Blue")}>Blue</h4>
              <h4 onClick={(e) => handleSortingAndUpdating(e, "Alphabetical")}>Alphabetical</h4>
            </div>
          </div>
        )
      } else {
        setToggleMenu(
          <div className='toggleMenuContainerList' onClick={handleMakeSortMenu}>
            <div className='firstLineMenu'></div>
            <div className='secondLineMenu'></div>
            <div className='thirdLineMenu'></div>
          </div>
        )
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorBox, sortMenuBoolean])

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