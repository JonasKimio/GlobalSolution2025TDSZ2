import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect } from 'react';
import api from '../../src/service/api';
import { colors } from '../../src/constants/colors';
import Button from '../../src/components/Button';
import { Course } from '../../src/types/Courses';

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
      router.push('/tabs/courses'); 
    } catch (error: any) {
        if (error.response?.status === 404) {
             Alert.alert("Erro", "Erro de conexão com o servidor.");
        } else {
             Alert.alert("Erro", "Não foi possível salvar o curso.");
        }
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
          <Text style={styles.label}>CURSO ID: {course.id}</Text>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.description}>{course.description}</Text>
          
          <View style={styles.infoBox}>
            <Text style={styles.info}>⏱ {course.duration}</Text>
            <Text style={styles.info}>⭐ {course.rating}/5</Text>
          </View>

          <Button title="Salvar no Meu Plano" variant="secondary" onPress={handleSave} />
          <Button title="Voltar" variant="outline" onPress={() => router.back()} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' },
  content: { backgroundColor: colors.white, padding: 20, borderRadius: 20, elevation: 5 },
  label: { color: colors.primary, fontWeight: 'bold', marginBottom: 10 },
  title: { fontSize: 26, fontWeight: 'bold', color: colors.text, marginBottom: 10 },
  description: { fontSize: 16, color: colors.gray, lineHeight: 24, marginBottom: 20 },
  infoBox: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  info: { fontWeight: 'bold', color: colors.text }
});