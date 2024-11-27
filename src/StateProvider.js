import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext(); //文件櫃
//reducer : means HOW to DISPATCH action to the data layer. add_to_cart or remove_from_cart
//StateProvider : 管理文件的組件。為啥可以寫成html?
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
// Pull information rom the data layer.
// useContext 並指定用 StateContext 這個共享資料層
