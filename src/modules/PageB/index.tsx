import { View, Text, Button } from 'react-native';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function PageB(props: any) {
  useEffect(() => {
    console.log('PageB did mount');

    return () => {
      console.log('PageB did unmount');
    };
  }, []);
  // const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>PageB Screen</Text>
      <Button title="Go to HomeDetails" onPress={() => props.navigation.navigate('Details')} />
    </View>
  );
}
