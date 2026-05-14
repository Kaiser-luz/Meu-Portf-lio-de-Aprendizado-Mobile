import React, { useState, useCallback } from 'react';
import { View, Text, Button, FlatList, TextInput, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { api } from '../../services/api';
import { Evento } from '../../types';

export default function ProfileScreen() {
    const [user, setUser] = useState<string | null>(null);
    const [usernameInput, setUsernameInput] = useState('');
    const [myEvents, setMyEvents] = useState<Evento[]>([]);
    const [form, setForm] = useState({ name: '', date: '' });

    // Checa se está logado toda vez que abre a aba
    const loadUserAndEvents = async () => {
        const loggedUser = await api.getUser();
        setUser(loggedUser);
        if (loggedUser) {
            setMyEvents(await api.getMyEvents());
        }
    };

    useFocusEffect(useCallback(() => { loadUserAndEvents(); }, []));

    const handleLogin = async () => {
        if (!usernameInput) return Alert.alert('Atenção', 'Digite um nome de usuário!');
        await api.login(usernameInput);
        loadUserAndEvents();
    };

    const handleLogout = async () => {
        await api.logout();
        setUser(null);
        setUsernameInput('');
    };

    const handleSave = async () => {
        if (!form.name || !form.date) return Alert.alert('Erro', 'Preencha tudo');
        try {
            const novo: any = { id: Date.now().toString(), name: form.name, dates: { start: { localDate: form.date } } };
            await api.saveMyEvent(novo);
            setForm({ name: '', date: '' });
            loadUserAndEvents();
        } catch (e: any) { Alert.alert('Erro', e.message); }
    };

    // --- TELA DE LOGIN ---
    if (!user) {
        return (
            <View style={styles.center}>
                <Text style={styles.title}>Entrar no Jiromso</Text>
                <TextInput
                    style={styles.loginInput}
                    placeholder="Seu nome de usuário..."
                    value={usernameInput}
                    onChangeText={setUsernameInput}
                    autoCapitalize="none"
                />
                <Button title="Acessar" onPress={handleLogin} color="#FF5722" />
            </View>
        );
    }

    // --- TELA DO PAINEL (LOGADO) ---
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Olá, {user}!</Text>
                <Button title="Sair" onPress={handleLogout} color="#999" />
            </View>

            <View style={styles.form}>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Criar Novo Evento</Text>
                <TextInput placeholder="Nome do Evento" style={styles.input} value={form.name} onChangeText={t => setForm({ ...form, name: t })} />
                <TextInput placeholder="Data (AAAA-MM-DD)" style={styles.input} value={form.date} onChangeText={t => setForm({ ...form, date: t })} />
                <Button title="Criar Evento (POST)" onPress={handleSave} color="#FF5722" />
            </View>

            <FlatList data={myEvents} keyExtractor={i => i.id} renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    <Text>{item.dates.start.localDate}</Text>
                    <Button title="Excluir (DELETE)" color="red" onPress={async () => { await api.deleteMyEvent(item.id); loadUserAndEvents(); }} />
                </View>
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 50 },
    center: { flex: 1, justifyContent: 'center', padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    loginInput: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16, borderWidth: 1, borderColor: '#DDD' },
    form: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 20 },
    input: { borderBottomWidth: 1, marginBottom: 15, paddingVertical: 5 },
    item: { padding: 15, backgroundColor: '#FFF', marginBottom: 10, borderRadius: 8, elevation: 1 }
});