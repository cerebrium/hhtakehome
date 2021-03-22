import { configureStore } from '@reduxjs/toolkit'
import colorListReducer from '../features/colorsList/colorSlice'
import selectedColorReducer from '../features/selectedColor/selectedColorSlice'


const store = configureStore({
  reducer: {
    colorList: colorListReducer,
    selectedColor: selectedColorReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store