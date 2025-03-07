import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages:null,
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload || [];  // Fallback to empty array
        }
        // setMessages: (state, action) => {
        //     if (Array.isArray(action.payload)) {
        //         state.messages = action.payload; // ✅ If it's an array, use it
        //     } else if (action.payload && typeof action.payload === "object") {
        //         state.messages = [action.payload]; // ✅ If it's a single object, wrap it in an array
        //     } else {
        //         state.messages = []; // ✅ Default to an empty array
        //     }
        // }
    }
})
export const { setMessages } = messageSlice.actions
export default messageSlice.reducer
