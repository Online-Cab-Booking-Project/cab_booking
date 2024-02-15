import { createSlice } from "@reduxjs/toolkit";


const complaintsSlice = createSlice({
    name: "complaint",
    initialState:
    {
        complaints: [],
        complaint: {
            "complaint_id": 2,
            "description": "this is complaint",
            "status": "R",
        }
    },

    reducers: {
        addComplaints(state, action) {
            state.complaints = [...state.complaints, action.payload];
        },

        removeComplaint(state, action) {
            state.complaints = state.complaints.filter((c) => {
                return c.complaint_id !== action.payload.complaint_id
            })
        },

        getComplaintById(state, action) {
            state.complaint = state.complaints.filter((c) => {
                return c.complaint_id === action.payload.complaint_id
            })
        }

    }

})

export const complaintsActions = complaintsSlice.actions;

export default complaintsSlice;