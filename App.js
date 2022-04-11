import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
import * as Brightness from 'expo-brightness'; // Import da biblioteca Brightness
import Slider from '@react-native-community/slider'; // Import da biblioteca Slider

const App = () => {
  const [brightness, setBrightness] = useState(0.50);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.setSystemBrightnessAsync(brightness);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Brilho: {parseInt(100*brightness)+'%'}</Text>
      <Slider style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#026E81"
          maximumTrackTintColor="#00ABBD"
          thumbTintColor="#FF9933"
          value={brightness}
          onValueChange={(brightness) => {
            setBrightness(brightness);
            Brightness.setSystemBrightnessAsync(brightness);
          }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A1C7E0',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',    
  },
  slider: {
    width:250,
    height:40
  }
});