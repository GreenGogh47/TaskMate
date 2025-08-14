import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { router } from 'expo-router';
import { authService } from '@/src/services/authService';
import { FormInput, PrimaryButton } from '@/src/components';
import { handleAuthError } from '@/src/utils';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await authService.signIn(email, password);
      // THE INDEX WOULD HANDLE THIS NOW
      router.replace('/tasks');
    } catch (error) {
      handleAuthError(error, "Login Error");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <FormInput value={email} onChangeText={setEmail} placeholder="Email" />
      <FormInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <PrimaryButton title="Login" onPress={handleLogin} />
      <PrimaryButton 
        title="Create an Account" 
        onPress={() => router.push('/public/signup')} 
      />
    </View>
  );
}

// This screens job is to just trigger the sign-in action,
// not to monitor it. So the authService is needed, not the hook.