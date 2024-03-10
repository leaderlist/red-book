import { View, Text, Button } from 'react-native';
import { NavigationProps } from 'src/types';

export const UploadModal = ({ navigation }: { navigation: NavigationProps }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
};
