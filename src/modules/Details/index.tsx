import { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function Details(props: any) {
  // console.log(props);
  useEffect(() => {
    console.log('details did mount');

    return () => {
      console.log('details did unmount');
    };
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screen</Text>
      <Button
        title="Go to DemoHome"
        onPress={() => {
          props.navigation.navigate('Demo');
        }}
      />
    </View>
  );
}
