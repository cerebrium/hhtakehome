import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ColorObject } from '../../types'

interface ColorListType {
  colorList: Array<ColorObject> 
}

const initialState: ColorListType = {
  colorList: []
}

export const colorListSlice = createSlice({
  name: 'colorListSlice',
  initialState,
  reducers: {
    addColors: (state, action) => {
      state.colorList = action.payload
    },
  },
});

export const { addColors } = colorListSlice.actions;

export const selectColorList = (state: RootState) => state.colorList.colorList;
export default colorListSlice.reducer;
