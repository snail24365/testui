// store.ts
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux' // Import required hooks
import recentProjectReducer from './recentProjectSlice'

// Set up the store
const store = configureStore({
  reducer: {
    recentProject: recentProjectReducer // Add the recent project reducer to the store
  }
})

// Define the RootState type based on the store
export type RootState = ReturnType<typeof store.getState> // The type of the store's state

// Create the typed useAppSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
