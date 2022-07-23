import React from 'react';
import { NativeBaseProvider, Box, StatusBar } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/theme';
import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? (
        <>
          <SignIn />
        </>
      ) : (
        <Loading />
      )}
    </NativeBaseProvider>
  );
}
