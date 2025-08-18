import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { router } from 'expo-router';
import { authService } from '@/services/userService';
import { FormInput, PrimaryButton } from '@/components/common';
import { handleAuthError } from '@/utils';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await authService.signIn(email, password);
    } catch (error) {
      handleAuthError(error, "Login Error");
    }
  };

  // Don't route to a particular page,
  // because the root _layout will handle that along with auth.

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