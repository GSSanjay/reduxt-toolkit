import {
  configureStore,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { combineReducers } from "redux";

const initialState = { count: 0 };

const counter = (state = initialState, action: { type: any }) => {
  switch (action.type) {
    case "incr":
      return { count: state.count + 1 };
    default:
      return state;
  }
};

export const getUsers = createAsyncThunk("getUsers", async () => {
  return await axios.get("http://api.github.com/users");
});

// const rootReducer = combineReducers({ counter });

const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    incr: (state, action) => {
      return { count: state.count + 1 };
    },
    decr: (state, action) => {
      return { count: state.count - 1 };
    },
  },
});

const usersSlice = createSlice({
  name: "users",
  initialState: { loading: false, users: [] },
  //Way 1
  /*   extraReducers: {
    [getUsers.pending]: (state) => {
      return { loading: true };
    },
    [getUsers.fulfilled]: (state, action) => {
      return { ...state, loading: false, users: action.payload.data };
    },
    [getUsers.rejected]: () => {
      return ["error"];
    },
  }, */

  //Way 2
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      return { ...state, loading: false, users: action.payload.data };
    });

    builder.addCase(getUsers.pending, (state, action) => {
      return { loading: true };
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      return ["error"];
    });
  },
  reducers: {},
});

export const { incr, decr } = counterSlice.actions;

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  users: usersSlice.reducer,
});

export const store = configureStore({
  reducer: {
    data: rootReducer,
  },
});

console.log("store", store.getState());
