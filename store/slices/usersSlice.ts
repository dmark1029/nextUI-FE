import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../types/user";

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(
        (user: { id: number }) => user.id !== action.payload,
      );
    },
  },
});

export const { setUsers, addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
