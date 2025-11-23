import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/constants/colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Sugestões',
          tabBarIcon: ({ color }) => <Ionicons name="bulb-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Meus Cursos',
          tabBarIcon: ({ color }) => <Ionicons name="library-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}