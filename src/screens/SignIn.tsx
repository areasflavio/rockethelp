import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();

  async function handleSignIn() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe Email e Senha.');
    }

    setIsLoading(true);

    try {
      const signInData = await auth().signInWithEmailAndPassword(
        email,
        password
      );

      console.log(signInData);
    } catch (err) {
      console.log(err);

      switch (err.code) {
        case 'auth/invalid-email':
          Alert.alert('Entrar', 'Email inválido.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Entrar', 'Email ou senha inválido.');
          break;
        case 'auth/user-not-found':
          Alert.alert('Entrar', 'Usuário não encontrado.');
          break;

        default:
          Alert.alert('Entrar', 'Não foi possível acessar.');
          break;
      }
    }

    setIsLoading(false);
    return;
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />

      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
