import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
        addFeed : (state,action)=>{
            return action.payload
        },
        removeUserFeed : (state,action)=>{
            const newArray = state.filter((item) => item._id !== action.payload);
            return newArray
        },
        removeAllFeed : ()=> null
    }
})

export const {addFeed,removeUserFeed,removeAllFeed}= feedSlice.actions
export default feedSlice.reducer