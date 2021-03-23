import React, { useEffect } from 'react';
import './App.scss';
import Header from './components/Header'
import LeftSection from './components/LeftSection'
import MainContent from './components/MainContent'
import { useDispatch } from 'react-redux';
import { 
  addColors
} from './features/colorsList/colorSlice'
import { ColorType, ColorObject } from './types'

function App() {
  // allow for access to the redux store
  const dispatch = useDispatch();

  async function getData(url = '') {
    const response = await fetch(url, {
      method:'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    return response ? response.json() : {'error': 'no response'}
  }

  // grab the selection of colors
  useEffect(() => {
    getData('https://nameless-badlands-02590.herokuapp.com/').then(response => {
      // array to be saved in state
      let sortableColorsArray: Array<ColorObject> = []

      // function for creating color objects
      let createColorObj = (hexInput: ColorType) => {
        // Get the RGB values to calculate the Hue
        let r = parseInt(hexInput.color.substring(1, 3), 16) / 255;
        let g = parseInt(hexInput.color.substring(3, 5), 16) / 255;
        let b = parseInt(hexInput.color.substring(5, 7), 16) / 255;
        
        // Getting the Max and Min values for Chroma
        let max = Math.max.apply(Math, [r, g, b]);
        let min = Math.min.apply(Math, [r, g, b]);
        
        // HSV values of hex color
        let chr = max - min;
        let hue = 0;
        let val = max;
        let sat = 0;
    
        
        if (val > 0) {
          // Calculate Saturation only if Value isn't 0
          sat = chr / val;
          if (sat > 0) {
            if (r === max) {
              hue = 60 * (((g - min) - (b - min)) / chr);
              if (hue < 0) {
                hue += 360;
              }
            } else if (g === max) {
              hue = 120 + 60 * (((b - min) - (r - min)) / chr);
            } else if (b === max) {
              hue = 240 + 60 * (((r - min) - (g - min)) / chr);
            }
          }
        }

        // make objects so they can be sorted in the main page
        let colorObj: ColorObject = {
          _id: hexInput._id,
          color: hexInput.color,
          name: hexInput.name,
          chroma: chr,
          hue: hue,
          sat: sat,
          val: val,
          luma: 0.3 * r + 0.59 * g + 0.11 * b,
          red: parseInt(hexInput.color.substring(1, 3), 16),
          green: parseInt(hexInput.color.substring(3, 5), 16),
          blue: parseInt(hexInput.color.substring(5, 7), 16)
        }
        return colorObj;
      };

      // create new color objects that are easily sortable
      response.forEach((item: ColorType) => {
        if (item.name !== 'Black') {
          sortableColorsArray.push(createColorObj(item))
        }
      })

      // initial sort
      sortableColorsArray.sort( (a, b) => (a.hue > b.hue ? 1 : -1))

      // place array in redux state
      dispatch(addColors(sortableColorsArray))
    })
  }, [])

  return (
    <div className="mainContainer">
      <Header />
      <LeftSection />
      <MainContent />
    </div>
  );
}

export default App;