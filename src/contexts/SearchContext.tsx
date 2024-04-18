import React, { createContext, FC, useState, ReactNode, useContext } from 'react';

type SearchContextType = {
    searchTerm: string;
    handleSearch: (searchTerm: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (searchTerm: string) => {
        
        setSearchTerm(searchTerm);
    };

    return (
        <SearchContext.Provider value={{ searchTerm, handleSearch }}>
            {children}
        </SearchContext.Provider>
    );
};