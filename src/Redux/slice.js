import { createSlice } from '@reduxjs/toolkit'

const sessionUserData = JSON.parse(sessionStorage.getItem('userData')) || {}
const user_logged_in = Object?.keys(sessionUserData)?.length !== 0

const initialState = {
    page: user_logged_in ? 'home' : 'register',
    userData: [],
    currentUserData: user_logged_in ? sessionUserData : {}
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
        },
        setCurrentUserData: (state, action) => {
            state.currentUserData = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setMenu, setUserData, setCurrentUserData } = reduxDataSlice.actions

export default reduxDataSlice.reducer