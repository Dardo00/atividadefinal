import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container, Typography, Box } from '@mui/material';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

const LOCAL_STORAGE_KEY = 'cadastroUsuarios';

const App = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUsers) setUsers(JSON.parse(storedUsers));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Cadastro" />
        <Tab label="Lista de Usuários" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {tabIndex === 0 && (
          <>
            <Typography variant="h5" gutterBottom>
              Cadastro de Usuários
            </Typography>
            <UserForm addUser={addUser} />
          </>
        )}
        {tabIndex === 1 && (
          <>
            <Typography variant="h5" gutterBottom>
              Lista de Usuários
            </Typography>
            <UserTable users={users} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default App;