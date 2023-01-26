import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: ""
}

const userSlice = createSlice({
    name: "usuario",
    initialState,
    reducers:{
        addUser(state, action) {
            state.user = action.payload;
        },
        deleteUser(state, action) {
            state.users = "";
        }
    }
});

console.log(userSlice);

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;