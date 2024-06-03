import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get as storageGet, clearLocalStorage } from '../../utils/localStorage';
import tokenDecoder from '../../utils/tokenDecoder';
import ITokenPayload from '../../types/ITokenPayload';
import type { RootState } from '../index';

// Define a type for the slice state
interface AuthState {
  id: string | null;
  role: string | null;
  token: string | null;
}

// Remove the duplicate interface declaration
// interface ITokenPayload {
//   id: string;
//   role: string;
// }

const storedToken: string | null = JSON.parse(storageGet('token'));
const tokenPayload: ITokenPayload | null = storedToken ? tokenDecoder(storedToken) : null;

const initialState: AuthState = {
  id: tokenPayload?.id ?? null,
  role: tokenPayload?.role ?? null,
  token: storedToken,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { token } }: PayloadAction<{ token: string }>,
    ) => {
      const { id, role } = tokenDecoder(token);
      state.id = id;
      state.role = role;
      state.token = token;
    },
    removeCredentials: (state) => {
      clearLocalStorage();
      state.id = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { setCredentials, removeCredentials } = slice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentUserRole = (state: RootState) => state.auth.role;

export default slice.reducer;

