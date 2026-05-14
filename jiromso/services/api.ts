import AsyncStorage from '@react-native-async-storage/async-storage';
import { Evento } from '../types';

const API_KEY = 'hG2ULEL3zWiujOIFuAqxqgZGGzhhO0kJ'; // Lembre-se da sua chave!

export const api = {
    // --- GET: Eventos da Ticketmaster ---
    getEvents: async (query = '', type = '', latlong = ''): Promise<Evento[]> => {
        try {
            let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&sort=date,asc`;
            if (query) url += `&keyword=${query}`;
            if (type) url += `&classificationName=${type}`;
            if (latlong) url += `&latlong=${latlong}&radius=50&unit=km`;
            const res = await fetch(url);
            const data = await res.json();
            return data._embedded?.events || [];
        } catch (e) { return []; }
    },

    getEventDetails: async (id: string): Promise<Evento | null> => {
        try {
            const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`);
            return await res.json();
        } catch (e) { return null; }
    },

    // --- AUTENTICAÇÃO SIMULADA ---
    login: async (username: string) => {
        await AsyncStorage.setItem('@current_user', username.toLowerCase().trim());
    },
    logout: async () => {
        await AsyncStorage.removeItem('@current_user');
    },
    getUser: async () => {
        return await AsyncStorage.getItem('@current_user');
    },

    // --- CRUD: Meus Eventos (Amarrado ao Usuário) ---
    getMyEvents: async (): Promise<Evento[]> => {
        const user = await api.getUser();
        if (!user) return [];
        const data = await AsyncStorage.getItem(`@events_${user}`);
        return data ? JSON.parse(data) : [];
    },
    saveMyEvent: async (event: Evento) => {
        const user = await api.getUser();
        if (!user) throw new Error('Precisa logar');
        const events = await api.getMyEvents();
        const index = events.findIndex(e => e.id === event.id);
        if (index >= 0) events[index] = event;
        else events.push({ ...event, id: Date.now().toString(), isUserCreated: true });
        await AsyncStorage.setItem(`@events_${user}`, JSON.stringify(events));
    },
    deleteMyEvent: async (id: string) => {
        const user = await api.getUser();
        const events = await api.getMyEvents();
        await AsyncStorage.setItem(`@events_${user}`, JSON.stringify(events.filter(e => e.id !== id)));
    },

    // --- FAVORITOS (Amarrado ao Usuário) ---
    getFavorites: async (): Promise<Evento[]> => {
        const user = await api.getUser();
        if (!user) return [];
        const favs = await AsyncStorage.getItem(`@favs_${user}`);
        return favs ? JSON.parse(favs) : [];
    },
    toggleFavorite: async (event: Evento) => {
        const user = await api.getUser();
        if (!user) throw new Error('Você precisa fazer login no seu Perfil para favoritar eventos!');
        let list = await api.getFavorites();
        const isFav = list.some(e => e.id === event.id);
        if (isFav) list = list.filter(e => e.id !== event.id);
        else list.push(event);
        await AsyncStorage.setItem(`@favs_${user}`, JSON.stringify(list));
    }
};