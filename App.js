import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Brightness from 'expo-brightness'; // Import da biblioteca Brightness
import Slider from '@react-native-community/slider'; // Import da biblioteca Slider
import FadeInOut from 'react-native-fade-in-out';

const App = () => {
  const [visivel, setVisivel] = useState(false);


  const [brilho, setBrilho] = useState(0.50);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.setSystemBrightnessAsync(brilho);
      }
    })();
  }, []);
  
  return (
    <View style={styles.container} >
      <Text style={styles.texto}>
      <FadeInOut visible={visivel} style={styles.texto}>
        Aceso
        </FadeInOut>
        <FadeInOut visible={!visivel}>
        Apagado
        </FadeInOut>
        </Text>
      <Text style={styles.texto}>Brilho: {parseInt(100*brilho)+'%'}</Text>
      
      <Slider style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#026E81"
          maximumTrackTintColor="#00ABBD"
          thumbTintColor="#FF9933"
          value={brilho}
          onValueChange={(brilho) => {
            setBrilho(brilho);
            Brightness.setSystemBrightnessAsync(brilho);
            setVisivel(brilho);
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
    color: '#fff'  
  },
  slider: {
    width:250,
    height:40
  }
});