import auth from '@react-native-firebase/auth';
import { Heading, Icon, IconButton, useTheme, VStack } from 'native-base';
import { Envelope, Eye, EyeSlash, Key } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert } from 'react-native';

import Logo from '../assets/logo_primary.svg';

import { AlertComponent } from '../components/Alert';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Não foi possível acessar.');
  const [showAlert, setShowAlert] = useState(false);

  const { colors } = useTheme();

  async function handleSignIn() {
    if (!email || !password) {
      setShowAlert(true);
      return;
    }

    setIsLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);

      switch (err.code) {
        case 'auth/invalid-email':
          setAlertMessage('Email inválido.');
          break;
        case 'auth/wrong-password':
          setAlertMessage('Email ou senha inválido.');
          break;
        case 'auth/user-not-found':
          setAlertMessage('Usuário não encontrado.');
          break;

        default:
          break;
      }

      setShowAlert(true);
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
        type={showPassword ? 'text' : 'password'}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        // secureTextEntry
        onChangeText={setPassword}
        InputRightElement={
          <IconButton
            icon={
              <Icon
                as={
                  showPassword ? (
                    <Eye color={colors.gray[300]} />
                  ) : (
                    <EyeSlash color={colors.gray[300]} />
                  )
                }
              />
            }
            mr={2}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />

      <AlertComponent
        setShow={setShowAlert}
        show={showAlert}
        status="error"
        title="Entrar"
        message={alertMessage}
      />
    </VStack>
  );
}
