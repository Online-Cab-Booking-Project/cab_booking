import { configureStore } from "@reduxjs/toolkit";
import complaintsSlice from "./complaints-slice";


const store = configureStore({
    reducer: {
        complaint: complaintsSlice.reducer
    }
});

export default store;