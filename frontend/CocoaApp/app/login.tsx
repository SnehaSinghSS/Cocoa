import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    // Check if fields are empty
    if (!email || !password) {
      alert('Both fields are required.');
      return;
    }

    setLoading(true);

    try {
      // Make API request
      const response = await axios.post(
        'https://boiling-scrubland-71738-7640d7d8de7b.herokuapp.com/api/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log(response.data); // Log server response

      // Success message
      alert('Login successful!');
      
      // Navigate to home or dashboard page
      router.push('/home');
    } catch (error) {
      // Handle API errors
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert('Invalid email or password.');
        } else {
          alert('Login failed! Please try again.');
        }
      } else {
        alert('An unexpected error occurred.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '80%', padding: 10, marginBottom: 10, borderWidth: 1, borderRadius: 5 },
});
