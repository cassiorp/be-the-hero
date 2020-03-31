import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
 
import './style.css';
import logo from '../../assets/logo.svg';
import api from  '../../api';
export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    const ongId = localStorage.getItem('id');

    async function hadleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }
        
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        } catch (error) {
            alert('erro ao cadastrar caso');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="be the hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Cadastre um novo caso, para que um heroi possa ajudar. 
                    </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para casos
                    </Link>
                </section>

                <form onSubmit={hadleNewIncident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)} 
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)} 
                    />

                    <button type="submit" className="button" >Cadastrar</button>
                </form>
            </div>
        </div>
    );
}