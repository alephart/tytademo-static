import { createContext, useState, useMemo } from 'react';

const TytaStateContext = createContext();

// export const Provider = TytaContext.Provider;
// export const Consumer = TytaContext.Consumer;

const TytaProvider = ({ children }) => {
  const [store, setStore] = useState({});

  const initialState = useMemo(
    () => ({
    store,
  }), [store],
  );

  return (
    <TytaStateContext.Provider value={initialState}>
      {children}
    </TytaStateContext.Provider>
  );
}

const useTytaContext = () => {
  return useContext(TytaStateContext);
}

export default TytaProvider;
export { useTytaContext };