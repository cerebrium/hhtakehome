import React, { useEffect, useState} from 'react'
import logo from '../images/logo-symbol.svg';
import { 
  selectColorList,
} from '../features/colorsList/colorSlice'
import {
  selectColor
} from '../features/selectedColor/selectedColorSlice'
import { useSelector, useDispatch  } from 'react-redux';
import { ColorObject } from '../types'

const Header = () => {
  // create redux selectors
  const colorList = useSelector(selectColorList)

  // declare the hook
  const dispatch = useDispatch();
  
  // local state
  const [inputValue, setInputValue] = useState<string>('')
  const [dropDown, setDropDown] = useState<JSX.Element>()

  // map the input to state
  const handleAddInput = (e: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }

  // select the color from search
  const handleSelectColor = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>, color: ColorObject) => {
    dispatch(selectColor(color))
    setInputValue('')
    setDropDown(undefined)
  }

  // make the dropdown with recommendations
  useEffect(() => {
    if (inputValue.length > 0) {
      let matchingColorsList = colorList.map((color, colorId) => {
        if (color.name.toLowerCase().includes(inputValue.toLowerCase())) {
          return (
            <h3 onClick={(e) => handleSelectColor(e, color)}>
              {color.name}
            </h3>
          )
        }
      })
      setDropDown(
        <div className='dropDownContainer'>
          { matchingColorsList}
        </div>
      )
    } else {
      setDropDown(undefined)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorList, inputValue])

  return (
    <header className="headerContainer">
      <img src={logo} alt="Helpful Human" className="helpfulHumanLogo" />
      <div className='searchBar'>
        <input type="text" placeholder='Search' value={inputValue} onChange={handleAddInput} />
        {dropDown}
      </div>
    </header>
  )
}

export default Header