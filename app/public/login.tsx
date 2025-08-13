import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { router } from 'expo-router';
import { authService } from '../../services/authService';
import { FormInput, PrimaryButton } from '@/components';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log("Login pressed", { email, password });
    try {
      await authService.signIn(email, password);
      // THE INDEX WOULD HANDLE THIS NOW
      router.replace('/tasks');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <FormInput value={email} onChangeText={setEmail} placeholder="Email" />
      <FormInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <PrimaryButton title="Login" onPress={handleLogin} />
    </View>
  );
}

// This screens job is to just trigger the sign-in action,
// not to monitor it. So the authService is needed, not the hook.