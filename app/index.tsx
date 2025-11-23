import { View, Text, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../src/constants/colors';
import Button from '../src/components/Button'; 
import LogoImage from '../assets/logo.png'; 

export default function Login() {
  
  const handleLogin = () => {
    router.replace('/tabs/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
            source={LogoImage} 
            style={styles.logoImage}
        /> 
      </View>

      <Text style={styles.title}>CareerPath</Text>
      <Text style={styles.subtitle}>Transforme seu futuro profissional</Text>

      <View style={styles.form}>
        <Button title="Entrar com E-mail" onPress={handleLogin} />
        <Button title="Criar conta" variant="outline" onPress={() => {}} />
      </View>

      <Text style={styles.footer}>FIAP Global Solution 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logoContainer: { width: 100, height: 100, backgroundColor: colors.white, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 5 },
  logoImage: { 
    width: 70, 
    height: 70,
    resizeMode: 'contain'
  },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 5 },
  subtitle: { fontSize: 16, color: colors.gray, marginBottom: 40 },
  form: { width: '100%' },
  footer: { marginTop: 50, color: colors.gray, fontSize: 12 }
});