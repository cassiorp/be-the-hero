import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import logo from '../../../assets/logo.png';
import style from './style';
import api from '../../api';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1)
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    function navigationToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if (loading){
            return;
        } 

        if (total > 0 && incidents.lenght === total) {
            return;
        }

        setLoading(true);

        const response = await api.get(`incidents?page=${page}`);

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, [])

    return (
        <View style={style.container} >
            <View style={style.header}>
                <Image source={logo} />
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold} >{total} casos. </Text>
                </Text>
            </View>

            <Text style={style.title}> Bem-vindo! </Text>
            <Text style={style.description}> Escolha um dos casos e salve o dia!!! </Text>

            <FlatList
                style={style.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}> ONG: </Text>
                        <Text style={style.incidentValue}> {incident.name} </Text>

                        <Text style={style.incidentProperty}> CASO: </Text>
                        <Text style={style.incidentValue}> {incident.title} </Text>

                        <Text style={style.incidentProperty}> VALOR: </Text>
                        <Text style={style.incidentValue}> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)} </Text>

                        <TouchableOpacity
                            style={style.detailsButton}
                            onPress={() => navigationToDetail(incident)}
                        >
                            <Text style={style.detailsButtonText} > Ver mais detalhes </Text>
                            <Feather name='arrow-right' />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
}