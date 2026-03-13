import { Stack } from 'expo-router';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='new-note' />
        <Stack.Screen name='settings' />
      </Stack>
    </RootSiblingParent>
  );
}
