import { ADD_ITEM, DELETE_ITEM } from "../actionTypes";
import { addUser, deleteUser } from "../actions/userAction";
import { createReducer } from "@reduxjs/toolkit";

console.log(addUser('Test'));

const initialState = {
  user: "",
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addUser, (state, action) => {
            state.user = action.payload;
        })
        .addCase(deleteUser, (state, action) => {
            state.users = "";
        });
});

export default userReducer;
/*
export default userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        numOfItems: state.numOfItems + 1,
      };

    case DELETE_ITEM:
      return {
        ...state,
        numOfItems: state.numOfItems - 1,
      };
    default:
      return state;
  }
};*/