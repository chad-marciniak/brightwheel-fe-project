import React, { ChangeEvent, FC, RefObject } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchContext } from '../contexts/SearchContext';
import { makeStyles } from '@mui/styles';

type SearchInputProps = {
  inputRef: RefObject<HTMLInputElement>;
};

const useStyles = makeStyles({
  root: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    color: '#5c5e6a'
  },
});
const SearchInput: FC<SearchInputProps> = ({ inputRef }) => {
  const { searchTerm, handleSearch } = useSearchContext();
  const classes = useStyles();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  }

  return (
    <TextField 
      fullWidth
      type="text" 
      name="search"
      placeholder="Search..."
      variant="outlined"
      sx={{
        mb: 3,
        background: '#ffffff',
        fontWeight: 'bold',
        '& fieldset': { border: 'none' },
        '& .MuiInputBase-input': {
          fontWeight: 'bold',
        },
      }}
      classes={{ root: classes.root }}
      value={searchTerm} 
      onChange={handleChange}
      inputRef={inputRef}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ color: '#5463d6' }}>
            <SearchIcon />
          </InputAdornment>
        ), 
      }}
    />
  );
};

export default SearchInput;
