import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Details from '../Details';

const Stack = createNativeStackNavigator();

function HomeScreen(props: any) {

  useEffect(() => {
    console.log('HomeScreen amount');

    return () => {
      console.log('HomeScreen unmount');
    }
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to PageB"
        onPress={() => {
          console.log(2222)
          props.navigation.navigate('PageB');
        }}
      />
    </View>
  );
}

export default HomeScreen;

function test (props: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: true, headerBackTitle: "返回", headerBackTitleStyle: { fontSize: 30 } }}
      />
    </Stack.Navigator>
  );
}