import React, {useState} from 'react';
import './style.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Register({ history }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  async function handleRegister(e){
    e.preventDefault();

    try {
      const response = await api.post('/ongs', {
        name, 
        email, 
        whatsapp,
        city,
        uf
      });

      const { id } = response.data;
  
      alert(`Seu id de acesso: ${id}`);
      history.push('/');
    } catch (error) {
      alert('Erro no cadastro, tente novamente');
    }
    


  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Logo"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>
          <Link to="/" className='back-link'>
            <FiArrowLeft size={16} color="#E02041"/>  Já tenho cadastro
          </Link>

          
        </section>
        <form onSubmit={(e)=> handleRegister(e)}>
            <input value={name}
              onChange={(e)=> setName(e.target.value)} 
              placeholder="Nome da ONG"/>
            <input type="email" 
              value={email} 
              onChange={(e)=> 
              setEmail(e.target.value)} 
              placeholder="E-mail"/>
            <input value={whatsapp} 
              onChange={(e)=> setWatsapp(e.target.value)} 
              placeholder="WhatsApp"/>
            <div className="input-group">
              <input value={city} 
                onChange={(e)=> setCity(e.target.value)} 
                placeholder="Cidade"/>
              <input value={uf} 
                onChange={(e)=> setUf(e.target.value.toUpperCase())} 
                placeholder="UF" 
                maxLength={2}
                style={{ width: 80 }}/>
            </div>
            <button className="button" type="submit">Cadastrar</button>
          </form>
      </div>
    </div>
  );
}