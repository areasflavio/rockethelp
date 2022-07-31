import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { VStack } from 'native-base';
import { useState } from 'react';

import { AlertComponent as Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');
  const [alertMessage, setAlertMessage] = useState({
    status: '',
    title: '',
    message: '',
  });
  const [showAlert, setShowAlert] = useState(false);

  const navigation = useNavigation();

  async function handleNewOrderRegister() {
    if (!patrimony || !description) {
      setShowAlert(true);
      setAlertMessage({
        status: 'error',
        title: 'Registrar',
        message: 'Preencha todos os campos.',
      });
      return;
    }

    setIsLoading(true);

    try {
      await firestore().collection('orders').add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp(),
      });

      setAlertMessage({
        status: 'success',
        title: 'Solicitação',
        message: 'Solicitação registrada com sucesso.',
      });

      setShowAlert(true);

      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (err) {
      console.log(err);
      setIsLoading(false);

      setAlertMessage({
        status: 'success',
        title: 'Solicitação',
        message: 'Não foi possível registrar o pedido',
      });
      setShowAlert(true);
      return;
    }
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />

      <Alert
        setShow={setShowAlert}
        show={showAlert}
        status={alertMessage.status}
        title={alertMessage.title}
        message={alertMessage.message}
      />
    </VStack>
  );
}
