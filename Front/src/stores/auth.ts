import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  isUser: boolean;
  isOrg: boolean | null;
  role: string | null;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    isUser: false,
    isOrg: null,
    role: null,
  } as UserState,
  reducers: {
    onLogin: (state, action: PayloadAction<UserState>) => {
      state.isUser = true;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.isOrg = state.role === 'ROLE_SHELTER';
    },
    onLogout: (state) => {
      state.isUser = false;
      state.username = null;
      state.isOrg = null;
    },
  }
});

export const { onLogin, onLogout } = userSlice.actions;