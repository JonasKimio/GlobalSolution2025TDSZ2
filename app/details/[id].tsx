import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect } from 'react';
import api from '../../src/services/api';
import { colors } from '../../src/constants/colors';
import Button from '../../src/components/Button';
import { Course } from '../../src/types/Course';

export default function CourseDetails() {
  const { id } = useLocalSearchParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        Alert.alert("Erro", "Curso não encontrado.");
        router.back();
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
        fetchDetails();
    }
  }, [id]);

  const handleSave = async () => {
    if (!course) return;

    try {
      await api.post('/my-courses', {
        userId: 1, 
        courseId: course.id
      });
      Alert.alert("Sucesso", "Curso salvo no seu plano de carreira!");
  
      router.push('/(tabs)/courses'); 
      
    } catch (error: any) {
        console.log(error);
        Alert.alert("Aviso", "Não foi possível salvar (talvez já esteja salvo?).");
    }
  };

  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
  }

  return (
    <View style={styles.container}>
      {course && (
        <View style={styles.content}>
          <View style={styles.headerRow}>
             <Text style={styles.label}>CURSO ID: {course.id}</Text>
             <Text style={{fontSize: 24}}>🎓</Text>
          </View>

          <Text style={styles.title}>{course.title}</Text>
          
          <View style={styles.infoBox}>
            <Text style={styles.info}>⏱ {course.duration}</Text>
            <Text style={styles.info}>⭐ {course.rating}/5</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Sobre o curso:</Text>
          <Text style={styles.description}>{course.description}</Text>
          
          <View style={{ marginTop: 'auto', gap: 10 }}>
            <Button title="Salvar no Meu Plano" variant="secondary" onPress={handleSave} />
            <Button title="Voltar" variant="outline" onPress={() => router.back()} />
          </View>

        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background, 
    padding: 20, 
    justifyContent: 'center' 
  },
  content: { 
    backgroundColor: colors.white, 
    padding: 24, 
    borderRadius: 20, 
    elevation: 5,
    minHeight: 400, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  label: { 
    color: colors.primary, 
    fontWeight: 'bold', 
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: colors.text, 
    marginBottom: 15 
  },
  infoBox: { 
    flexDirection: 'row', 
    gap: 20,
    marginBottom: 20 
  },
  info: { 
    fontWeight: '600', 
    color: '#555',
    fontSize: 16
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  description: { 
    fontSize: 16, 
    color: colors.gray, 
    lineHeight: 24, 
    marginBottom: 30 
  }
});