import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import api from '../../src/service/api';
import { colors } from '../../src/constants/colors';
import Button from '../../src/components/Button';
import { router } from 'expo-router'; 

export default function Profile() {
  const [profession, setProfession] = useState('');

  const handleUpdateProfile = async () => {
    if(!profession) return Alert.alert("Atenção", "Digite uma profissão");

    try {
      await api.put('/users/1', {
        profession: profession
      });
      Alert.alert("Perfil Atualizado", "Suas sugestões na Home serão atualizadas!");
      setProfession('');
    } catch (error) {
      Alert.alert("Erro", "Falha ao atualizar perfil.");
    }
  };
  
  const handleLogout = () => {
      router.replace('/'); 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Perfil</Text>
      <Text style={styles.label}>Qual sua profissão ou foco atual?</Text>
      
      <TextInput 
        style={styles.input}
        placeholder="Ex: Desenvolvedor Java"
        value={profession}
        onChangeText={setProfession}
      />

      <Button title="Atualizar Sugestões" onPress={handleUpdateProfile} />
      
      <View style={{ marginTop: 50 }}>
        <Button title="Sair / Logout" variant="outline" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: colors.primary },
  label: { fontSize: 16, marginBottom: 10, color: colors.text },
  input: { 
    backgroundColor: colors.white, 
    padding: 15, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#DDD', 
    marginBottom: 20 
  }
});