import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import api from '../../src/services/api';
import { colors } from '../../src/constants/colors';
import { Course } from '../../src/types/Course';

export default function CoursesScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os cursos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const renderItem = ({ item }: { item: Course }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(`/details/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.headerCard}>
         <Text style={styles.idBadge}>#{item.id}</Text>
         <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
      
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.footer}>
        <Text style={styles.duration}>⏱ {item.duration}</Text>
        <Text style={styles.detailsLink}>Ver detalhes →</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Cursos Disponíveis</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: colors.primary, 
    marginBottom: 20, 
    marginTop: 10 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20,
    marginBottom: 15, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary 
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  idBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold'
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E6A300'
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 8 
  },
  description: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 15,
    lineHeight: 20
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10
  },
  duration: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#555' 
  },
  detailsLink: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14
  }
});