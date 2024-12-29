import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';


export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

// const handleSignup = async () => {
//     // Check if any field is empty
//     if (!email || !password || !confirmPassword) {
//       alert('All fields are required.');
//       return;
//     }
  
//     // Check if passwords match
//     if (password !== confirmPassword) {
//       alert('Passwords do not match.');
//       return;
//     }
  
//     // Proceed with API call if validations pass
//     try {
//       const response = await axios.post(
//         'https://boiling-scrubland-71738-7640d7d8de7b.herokuapp.com/api/signup',
//         { email, password },
//         {
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//       console.log(response.data);
//       alert('Signup successful!');
//       // Navigate to the login screen
//       router.push('/login');
//     } catch (error) {
//       alert('Signup failed!');
//       console.error(error);
//     }
//   };
    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
        alert('All fields are required.');
        return;
        }
    
        if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
        }
    
        try {
        const response = await axios.post(
            'https://boiling-scrubland-71738-7640d7d8de7b.herokuapp.com/api/signup',
            { email, password },
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(response.data);
        alert('Signup successful!');
        router.push('/login');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors
                console.error('Axios error:', error.response?.data || error.message);
                if (error.response?.status === 400 && error.response.data?.error === 'Email already in use') {
                  alert('This email is already registered.');
                } else {
                  alert('Signup failed! Please try again.');
                }
              } else if (error instanceof Error) {
                // Handle generic errors
                console.error('Unexpected error:', error.message);
                alert('An unexpected error occurred.');
              } else {
                console.error('Unknown error:', error);
                alert('An unknown error occurred.');
              }
        }
    };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '80%', padding: 10, marginBottom: 10, borderWidth: 1, borderRadius: 5 },
});
