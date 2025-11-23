import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;      
  textStyle?: TextStyle; 
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  style, 
  textStyle 
}: ButtonProps) {
  
  const getBackgroundColor = () => {
    if (variant === 'secondary') return colors.secondary;
    if (variant === 'outline') return 'transparent';
    return colors.primary;
  };

  const defaultTextColor = variant === 'outline' ? colors.primary : colors.white;

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: getBackgroundColor(), borderWidth: variant === 'outline' ? 1 : 0 },
        style 
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.text, 
        { color: defaultTextColor },
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    width: '100%',
    borderColor: colors.primary
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});