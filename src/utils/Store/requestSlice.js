import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name : "requests",
    initialState : null,
    reducers : {
        addRequests : (state,action)=>{
            return action.payload ;
        },
        removeRequests : (state,action)=>{
            const newArray = state.filter((item) => item._id !== action.payload);
            return newArray
        },
        removeAllRequests : ()=>null
    }
})

export const {addRequests,removeRequests,removeAllRequests} = requestSlice.actions
export default requestSlice.reducer