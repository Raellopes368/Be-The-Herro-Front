import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

export default function Logon({ history }){
  const [id, setId] = useState('');
  async function handleLogin(e){
    e.preventDefault();
    try {
      const response = await api.post('/sessions', { id });
      // console.log(response.data)
      const { name } = response.data;

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', name);
      history.push('/profile')
    } catch (error) {
      alert('Falha no Login, tente novamente')
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Logo"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input type="text" value={id} onChange={(e)=> setId(e.target.value)} placeholder="Sua ID"/>
          <button type="submit" className="button">Entrar</button>
          <Link to="/register" className='back-link'>
            <FiLogIn size={16} color="#E02041"/>  Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  );
}