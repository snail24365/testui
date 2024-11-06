import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the state
export interface RecentProjectState {
  recentProjectFilePath: string | null
}

// Define the initial state
const initialState: RecentProjectState = {
  recentProjectFilePath: null
}

// Create the slice
const recentProjectSlice = createSlice({
  name: 'recentProject',
  initialState,
  reducers: {
    setRecentProject: (state, action: PayloadAction<string>) => {
      state.recentProjectFilePath = action.payload
    },
    clearRecentProject: (state) => {
      state.recentProjectFilePath = null
    }
  }
})

// Export actions
export const { setRecentProject, clearRecentProject } = recentProjectSlice.actions

// Export the reducer
export default recentProjectSlice.reducer
