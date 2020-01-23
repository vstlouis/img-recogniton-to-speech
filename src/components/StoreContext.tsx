import React, { useContext } from "react";
import { useLocalStore } from "mobx-react";
import { createStore, TStore } from "../utils/createStore";

const StoreContext = React.createContext<TStore | null>(null);

// StoreProvider to wrap our application in so we can use the shared store
export const StoreProvider = ({ children }) => {
  const store = useLocalStore(createStore);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
