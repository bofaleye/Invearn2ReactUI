import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Todo {
  name: string;
  done: boolean;
}

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Todo>) => {
      const newState = { ...state };
      newState.todos.push(action.payload);
      return newState;
    },
  },
});

export const { addItem } = todoSlice.actions;
export default todoSlice;
