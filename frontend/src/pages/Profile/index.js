import React, {  useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './style.css'
import logoImg from '../../assets/logo.svg';
import api from '../../api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const name = localStorage.getItem('name');
    const ongId = localStorage.getItem('id');
    
    useEffect(() => {
        api.get('profile', {
           headers: {
               Authorization: ongId,
           } 
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId])

    async function hadleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                } 
            });
            setIncidents(incidents.filter(incident => incident.id != id));
        } catch (erro) {
            alert('erro ao deletar');
        }
    }

    function hadleLogout(){
        localStorage.clear();
        history.push('/');
    }


    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="be the hero" />
                <span>Bem vinda, {name}</span>

                <Link className="button" to="/incidents/new" >
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={hadleLogout}> 
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
               {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button type="button" onClick={() => hadleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
               ) )}
            </ul>
        </div>
    );
}