import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Alert, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarredList from './StarredList';

const StarredCount: FC = () => {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const { isLoading, isError, data } = useQuery<number>('starredCount', async () => {
    const response = await fetch('http://localhost:3001/search?starred=true');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const items: number[] = await response.json();
    const starredCount: number = items.length;
    return starredCount;
  });
    
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Alert severity="error">Error fetching data</Alert>;

  const handleListToggle = () => {
    setIsListOpen(!isListOpen);
  };
  
  return (
    <>
      <Box
        component="div"
        border="none"
        width="56px"
        height="48px"
        color="#5463d6"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={1}
        position="relative"
      >   
        <IconButton onClick={handleListToggle} style={{ position: 'absolute', zIndex: 1, fontSize: '16px' }}>
          <StarIcon style={{ color: '#ff5b60' }} />
          <div>{data}</div>
        </IconButton>
      </Box>
      <StarredList isOpen={isListOpen} />
    </>
  );
};

export default StarredCount;
