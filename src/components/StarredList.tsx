import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Box, Alert, List, ListItem, ListItemText, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

type Address = {
  address1: string;
  city: string;
  state: string;
  postalCode: string;
};

type ListItemType = {
  id: string;
  name: string;
  address: Address;
};

type StarredListProps = {
  isOpen: boolean;
};

const StarredList: FC<StarredListProps> = ({ isOpen }) => {
  const { isLoading, isError, data } = useQuery<ListItemType[]>('starredItems', async () => {
    const response = await fetch('http://localhost:3001/search?starred=true');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<ListItemType[]>;
  });

  return (
    <Box
      style={{
        display: isOpen ? 'block' : 'none',
        position: 'absolute',
        top: '248px',
        right: '50px',
        zIndex: 1000,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box borderRadius={4} bgcolor="white" maxHeight="300px" overflow="auto">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <Alert severity="error">Error fetching data!</Alert>
        ) : (
          <List>
            <ListItem disablePadding>
              <ListItemText
                sx={{ ml: 1 }}
                primary="Starred Items"
                primaryTypographyProps={{ color: '#5c5e6a' }}
              />
            </ListItem>
            <Divider />
            {data && data.map((item, index) => (
                <div key={item.id}>
                    <ListItem disablePadding sx={{ color: '#5c5e6a' }}>
                        <StarIcon sx={{ color: '#ff5b60', ml: 1, mr: 1 }} />
                        <ListItemText primary={item.name} secondary={`${item.address.city}, ${item.address.state}`} />
                    </ListItem>
                    {index < data.length - 1 && <Divider />}
                </div>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default StarredList;
