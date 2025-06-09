import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';


const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, 'usuarios');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList = Object.entries(data).map(([id, user]) => ({
          id,
          ...user
        }));
        setUsers(userList);
      } else {
        setUsers([]);
      }
    });
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Cadastrar</Link>
        <Link to="/lista">Lista de Usuários</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UserFormPage />} />
        <Route path="/lista" element={<UserListPage users={users} />} />
      </Routes>
    </div>
  );
};

export default App;
