import { useState, createContext, useContext } from "react";

// Step 1: Create context
const SearchContext = createContext();

// Step 2: Create Provider component
const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

// Step 3: Custom hook to use context easily
const useSearch = () => useContext(SearchContext);

// Step 4: Export
export { useSearch, SearchProvider };
