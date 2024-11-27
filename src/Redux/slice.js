import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    page: 'register',
    userData: [],
    currentUserData: {}
}

export const reduxDataSlice = createSlice({
    name: 'reduxData',
    initialState,
    reducers: {
        setMenu: (state, action) => {
            state.page = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setMenu, setUserData } = reduxDataSlice.actions

export default reduxDataSlice.reducer