import React, { FC, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { IconButton, CircularProgress, Alert, Box, Grid, Typography } from '@mui/material';
import { BrokenImage, Star, StarOutline } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useSearchContext } from '../contexts/SearchContext';
import { fontWeight } from '@mui/system';

type Address = {
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  address2?: string;
};

type ListItem = {
  image?: string;
  id: string;
  name: string;
  starred: boolean;
  description: string;
  address: Address;
};

const List: FC = () => {
  const { searchTerm } = useSearchContext();
  const queryClient = useQueryClient();
  // fetch data from the server
  const { data, isLoading, isError } = useQuery<ListItem[], Error>(
    ['search', searchTerm],
    async (): Promise<ListItem[]> => {
      try {
        const response = await fetch(`http://localhost:3001/search?q=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // sort the response by name
        const data = await response.json();
        return data.sort((a: ListItem, b: ListItem) => a.name.localeCompare(b.name));
      } catch (error) {
        return [];
      }
    }, {
      retry: 3,
      staleTime: 60000,
      refetchOnWindowFocus: false,
    },
  );
  // mutation to update starred status
  const updateStarredMutation = useMutation((item: ListItem) => {
    return fetch(`http://localhost:3001/search/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
  }, {
    onMutate: (newItem) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      queryClient.cancelQueries('items');
      const previousItems = queryClient.getQueryData('items');

      // Optimistically update to the new value
      queryClient.setQueryData('items', (old: ListItem[] | undefined) =>
        old ? old.map(item => item.id === newItem.id ? newItem : item) : []
      );

      // Return the snapshotted value
      return () => queryClient.setQueryData('items', previousItems);
    },
    // On failure, roll back to the previous value
    onError: (err, newItem, rollback) => {
      rollback?.();
    },
    // After success or failure, refetch the items query
    onSettled: () => {
      queryClient.invalidateQueries('items');
    },
    onSuccess: () => {
      //invalidate queries
      const queryKeysToInvalidate = ['starredCount', 'starredItems'];
      queryKeysToInvalidate.forEach(queryKey => {
        queryClient.invalidateQueries(queryKey);
      });
    }
  });

  const handleStarClick = useCallback((item: ListItem) => {
    const newItem = { ...item, starred: !item.starred }; // Toggle starred status
    // Optimistically update the item locally
    const updatedData = data?.map((item: ListItem) => (item.id === newItem.id ? newItem : item));
    queryClient.setQueryData(['search', searchTerm], updatedData); // Update the local data immediately
    try {
      updateStarredMutation.mutateAsync(newItem); // Send the mutation request
    } catch (error) {
      // Revert the local update if the mutation request fails
      queryClient.setQueryData(['search', searchTerm], data);
    }
  }, [data, queryClient, searchTerm, updateStarredMutation]);
  
  // set columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'image', headerName: 'Image', width: 60, renderCell: (params) => (
      <>
        {params.row.image ? (
          <img width="52" height="52" src={params.row.image} alt=""/>
        ) : (
          <BrokenImage style={{ width: 52, height: 52 }} />
        )}
      </>
    )},
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'address', headerName: 'Address', width: 250, renderCell: (params) => (
      <>
        {params.row && params.row.address && (
          <>
            <div>{params.row.address.address1}</div>
            <div>{params.row.address.city}, {params.row.address.state} {params.row.address.postalCode}</div>
          </>
        )}
      </>
    )},
    { field: 'starred', headerName: 'Starred', width: 60, renderCell: (params) => (
      <IconButton onClick={() => handleStarClick(params.row)}>
        {params.row.starred ? <Star style={{ color: '#ff5b60' }} /> : <StarOutline style={{ color: '#5463d6' }} />}
      </IconButton>
    )},
  ];

  return (
    <Box style={{ 
      height: '576px', 
      width: '1000px',
      backgroundColor: '#ffffff',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '16px'
    }}>
      {isLoading ? (
        <Grid container
          justifyContent="center"
          alignItems="center" 
          style={{ height: '576px', width: '100%' }}>
          <Grid item sx={{ color: '#5463d6'}}>
            <Typography variant="h6">Loading...</Typography>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <>
          {isError ? (
            <Alert severity="error">Error fetching data.</Alert>
          ) : (
            <DataGrid
              rows={data || []}
              columns={columns}
              classes={{ root: 'data-grid' }}
              style={{ 
                borderRadius: '16px', 
                borderColor: '#ffffff', 
                backgroundColor: '#ffffff', 
                color: '#5c5e6a', 
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

const MemoizedList = React.memo(List);
export default MemoizedList;
