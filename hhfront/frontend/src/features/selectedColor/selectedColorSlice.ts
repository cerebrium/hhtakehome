import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ColorObject } from '../../types'

interface ColorListType {
  selectedColor: ColorObject | null
}

const initialState: ColorListType = {
  selectedColor: null
}

export const selectedColorSlice = createSlice({
  name: 'selectedColorSlice',
  initialState,
  reducers: {
    selectColor: (state, action) => {
      state.selectedColor = action.payload
    },
  },
});

export const { selectColor } = selectedColorSlice.actions;

export const selectedColor = (state: RootState) => state.selectedColor.selectedColor;
export default selectedColorSlice.reducer;
