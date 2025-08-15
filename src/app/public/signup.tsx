import React, { useState } from 'react';
import { View } from 'react-native';
import { dbService } from '@/src/services/userService';
import { FormInput, PrimaryButton } from '@/src/components';
import { handleAuthError } from '@/src/utils';


export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const newAccount = async () => {
    try {
      await dbService.newUserCreation(email, password, { displayName });
    } catch (error) {
      handleAuthError(error, "Signup Error");
    }
  };

  // Adding router.replace('/'); after the await statement
  // didn't give `useAuth` enough time to detect the new Firebase user
  // No additional routing is needed - goes to the route layout.

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <FormInput value={email} onChangeText={setEmail} placeholder="Email" />
      <FormInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <FormInput value={displayName} onChangeText={setDisplayName} placeholder="Display Name (optional)" />
      <PrimaryButton title="Signup" onPress={newAccount} />
    </View>
  );
}