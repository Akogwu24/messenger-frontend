import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';

export const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  return <Box></Box>;
};
