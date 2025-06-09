import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const userRef = ref(db, 'usuarios');
    push(userRef, { name, email });

    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label><br />
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label><br />
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Cadastrar</button>
    </form>
  );
};

export default UserForm;
