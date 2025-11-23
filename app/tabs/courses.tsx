import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router'; 
import api from '../../src/service/api';
import { colors } from '../../src/constants/colors';
import Button from '../../src/components/Button';

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      
      const response = await api.get('/my-courses');
      const allCoursesResponse = await api.get('/courses');
      const allCourses = allCoursesResponse.data;

      const savedIds = response.data.map((saved: any) => saved.courseId);
      const myFullCourses = allCourses.filter((course: any) => savedIds.includes(course.id));

      setMyCourses(myFullCourses);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMyCourses();
    }, [])
  );

  const handleRemove = async (courseId: number) => {
    try {
      const savedResponse = await api.get('/my-courses');
      const recordToDelete = savedResponse.data.find((item: any) => item.courseId == courseId);

      if (recordToDelete) {
        await api.delete(`/my-courses/${recordToDelete.id}`);
        Alert.alert("Removido", "Curso removido do seu plano.");
        fetchMyCourses(); 
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Plano de Estudos</Text>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} size="large" style={{marginTop: 20}} />
      ) : (
        <FlatList
          data={myCourses}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 20 }}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Você ainda não salvou nenhum curso.</Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.duration}>⏱ {item.duration}</Text>
              <Button 
                title="Remover" 
                variant="outline" 
                onPress={() => handleRemove(item.id)} 
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 20, backgroundColor: colors.primary, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.white },
  emptyText: { textAlign: 'center', marginTop: 50, color: colors.gray },
  card: { backgroundColor: colors.white, padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  duration: { color: colors.gray, marginBottom: 10 }
});