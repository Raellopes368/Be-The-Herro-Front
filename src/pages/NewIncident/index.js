import React, { useState } from 'react';
import './style.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function NewIncident(){
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [value,setValue] = useState('');
  const ongID = localStorage.getItem('ongId');

  async function handleNew(e){
    e.preventDefault();
    console.log({
      title,
      description,
      value
    })
    try {
      await api.post('incidents',{
        title,
        description,
        value
      },{
        headers: {
          authorization: ongID
        }
      });
      alert('Novo caso criado com sucesso');
    } catch (error) {
      alert('Erro ao cadastrar novo caso, tente novamente');
    }
  }
  return (
    <div className="incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Logo"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link to="/profile" className='back-link'>
            <FiArrowLeft size={16} color="#E02041"/>  Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNew}>
            <input type="text" 
              value={title}
              onChange={(e)=> setTitle(e.target.value)}  
              placeholder="Título do caso"/>
            <textarea 
              value={description}
              onChange={(e)=> setDescription(e.target.value)}  
              placeholder="Descrição"/>
            <input 
              value={value}
              onChange={(e)=> setValue(e.target.value.replace(',','.'))}  
              type="text" 
              placeholder="Valor em reais"/>
            <button className="button" type="submit">Cadastrar</button>
          </form>
      </div>
    </div>
  );
}