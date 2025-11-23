import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import api from '../../src/services/api';
import { colors } from '../../src/constants/colors';
import Button from '../../src/components/Button';
import { Course } from '../../src/types/Course';

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    setLoading(true); 
    try {
      const response = await api.get('/courses'); 
      setCourses(response.data);
    } catch (error: any) {
      console.error("ERRO DE CARREGAMENTO DA API:", error.message);
      Alert.alert("Erro de Conexão", "Não foi possível carregar os cursos. Verifique o servidor JSON ou o IP.");
      setCourses([]);
    } finally {
      setLoading(false); 
    }
  };
  
  useEffect(() => {
    fetchCourses();
  }, []);

  const goToDetails = (id: string | number) => {
    router.push(`/details/${id}`);
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Olá, Desenvolvedor!</Text>
          <Text style={styles.description}>Sugestões baseadas no seu perfil:</Text>
        </View>
        
        <View style={styles.profileButtonContainer}>
          <Button 
            title="Perfil" 
            variant="outline" 
            onPress={() => router.push('/(tabs)/profile')} 
            style={{ borderColor: colors.white }} 
            textStyle={{ color: colors.white }} 
          />
        </View>
      </View>
      
      <View style={styles.navButtons}>
        <Button 
          title="Ver Meu Plano" 
          variant="secondary" 
          onPress={() => router.push('/(tabs)/courses')} 
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 50 }} />
      ) : (
        <View>
          {courses.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText} numberOfLines={2}>{item.description}</Text>
              <Button title="Ver Detalhes" onPress={() => goToDetails(item.id)} />
            </View>
          ))}
          
          {courses.length === 0 && (
            <Text style={styles.emptyText}>Nenhuma sugestão encontrada no momento.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { 
    padding: 20, 
    backgroundColor: colors.primary, 
    paddingBottom: 30,
    paddingRight: 80 
  },
  welcome: { fontSize: 24, fontWeight: 'bold', color: colors.white },
  description: { color: '#E0E7FF', marginTop: 5 },
  
  profileButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 10,
    width: 100,
    height: 40,
  },
  
  navButtons: {
      paddingHorizontal: 15,
      paddingTop: 10
  },

  card: { 
    backgroundColor: colors.white, 
    margin: 15, marginTop: 0, marginBottom: 15, padding: 20, borderRadius: 15,
    elevation: 3
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 5 },
  cardText: { color: colors.gray, marginBottom: 15 },
  emptyText: { textAlign: 'center', marginTop: 20, color: colors.gray }
});