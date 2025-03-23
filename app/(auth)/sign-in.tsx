import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  text: '#000000',
  error: '#FF3B30',
  link: '#007AFF',
  overlay: 'rgba(0, 0, 0, 0.3)',
};

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError('');

      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      const storedUser = await AsyncStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user || user.email !== email || user.password !== password) {
        throw new Error('Invalid email or password');
      }

      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      router.replace('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ImageBackground
        source={require('../../assets/images/signup.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text variant="headlineMedium" style={styles.title}>
              Sign In
            </Text>

            <TextInput
              mode="flat"
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              textColor={colors.text}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              disabled={loading}
              contentStyle={styles.inputContent}
              theme={{ colors: { primary: colors.primary } }}
            />

            <TextInput
              mode="flat"
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              textColor={colors.text}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              disabled={loading}
              contentStyle={styles.inputContent}
              theme={{ colors: { primary: colors.primary } }}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
              mode="contained"
              onPress={handleSignIn}
              style={styles.button}
              loading={loading}
              disabled={loading}
              buttonColor={colors.primary}
            >
              <Text>Login Now</Text>
            </Button>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don&apos;t have an account? </Text>
              <Link href="/sign-up" asChild>
                <Text style={styles.link}>Signup now</Text>
              </Link>
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  button: {
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    marginTop: 8,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  error: {
    color: colors.error,
    marginBottom: 8,
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 24,
  },
  footerText: {
    color: colors.background,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    height: 56,
    marginBottom: 16,
    width: '100%',
  },
  inputContent: {
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  link: {
    color: colors.link,
    fontWeight: '600',
  },
  overlay: {
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: colors.background,
    fontWeight: 'bold',
    marginBottom: 32,
  },
});
