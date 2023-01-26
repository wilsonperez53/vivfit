import { createAction } from "@reduxjs/toolkit";

export const addUser = createAction('addUser');
export const deleteUser = createAction('deleteUser');

/*import { ADD_ITEM, DELETE_ITEM } from "../actionTypes/actionTypes";

const addItem = (payload) => {
  return {
    type: ADD_ITEM,
    payload
  };
};

const deleteItem = () => {
  return {
    type: DELETE_ITEM,
  };
};

export { addItem, deleteItem };*/

