import React, { FC, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchProvider } from './contexts/SearchContext';
import SearchInput from "./components/SearchInput";
import MemoizedList from "./components/List";
import StarredCount from "./components/StarredCount";
import SearchIcon from '@mui/icons-material/Search';
import "./App.css";

const queryClient = new QueryClient();

const App: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <div className="App">
          <h1 style={{ 
            color: '#5463d6',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Company Directory Search <SearchIcon style={{ fontSize: '36px', color: '#5463d6', marginLeft: '12px' }} />
          </h1>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SearchInput inputRef={inputRef} />
            <StarredCount />
          </div>
          <MemoizedList />
        </div>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export default App;
