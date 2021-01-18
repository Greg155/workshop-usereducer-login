import React, { useState, useReducer } from "react";
import { login } from "./utils/login";

import "./App.css";
import { act } from "react-dom/test-utils";

const App = () => {
  const initalState = {
    username: "",
    password: "",
    isLoading: false,
    error: "",
    isLoggedIn: false,
  };

  const [state, dispatch] = useReducer(reducer, initalState);
  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "show_loader" });

    try {
      console.log(username, password, "dans le try");
      await login({ ...state });
      dispatch({ type: "success" });
    } catch (error) {
      console.log("oucou", error);
      dispatch({ type: "error", payload: error });
    }
  };

  function reducer(state, action) {
    switch (action.type) {
      case "fill_input":
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case "show_loader":
        return { ...state, isLoading: true };
      case "success":
        return { ...state, isLoading: false, isLoggedIn: true };
      case "error":
        return { ...initalState, error: action.payload };
      case "logout":
        return { ...state, isLoggedIn: false };
      default:
        return state;
    }
  }

  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}</h1>
            <button onClick={() => dispatch({ type: "logout" })}>
              Log Out
            </button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error.toString()}</p>}
            <p>Please Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: "fill_input",
                  fieldName: "username",
                  payload: e.currentTarget.value,
                })
              }
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={state.password}
              onChange={(e) =>
                dispatch({
                  type: "fill_input",
                  fieldName: "password",
                  payload: e.currentTarget.value,
                })
              }
            />
            <button className="submit" type="submit" disabled={state.isLoading}>
              {state.isLoading ? "Logging in ..." : "Log In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;
