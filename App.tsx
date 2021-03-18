import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import axios from 'axios';

const machineUrl = `http://192.168.86.181:1880/start`;

export default function App() {
  const [entry, setEntry] = React.useState(``);
  const [nextNumber, setNextNumber] = React.useState(``);
  const [counter, setCounter] = React.useState(0);

  let explosion: any;

  const number = async (input: string) => {
    setEntry(entry + input);
  }

  const submit = async () => {

    if (entry == nextNumber) {
      explosion && explosion.start();
      await setCounter(counter + 1);
    } else {
      alert(`Boohoo`);
    }
    next();
  }

  const next = async () => {
    await setEntry(``);
    const newNumber = await axios.get(machineUrl);
    alert(`Your next number is ${newNumber.data}`);
    await setNextNumber(newNumber.data);
  }

  const reset = async () => {
    await setCounter(0);
    next();
  }

  return (
    <View style={styles.container}>
      <View style={styles.counter}>
        <Text style={styles.counterText}>
          {counter}
        </Text>
      </View>      
      <View style={styles.lcdPanel}>
        <Text style={styles.lcdText}>
          {entry}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={styles.button}>
          <Button title={`1`} onPress={() => number(`1`)}></Button>
        </View>
        <View style={styles.button}>
          <Button title={`2`} onPress={() => number(`2`)}></Button>
        </View>
        <View style={styles.button}>
          <Button title={`3`} onPress={() => number(`3`)}></Button>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.button}>
          <Button title={`4`} onPress={() => number(`4`)}></Button>
        </View>
        <View style={styles.button}>
          <Button title={`5`} onPress={() => number(`5`)}></Button>
        </View>
        <View style={styles.button}>
          <Button title={`6`} onPress={() => number(`6`)}></Button>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.button}>
          <Button title={`7`} onPress={() => number(`7`)}></Button>
        </View>
        <View style={styles.button}>
          <Button title={`8`} onPress={() => number(`8`)}></Button>
        </View>
        <View style={styles.button}>
          <Button title={`9`} onPress={() => number(`9`)}></Button>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.button, styles.full]}>  
          <Button title={`0`} onPress={() => number(`0`)}></Button>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.button, styles.full, styles.submit]}>  
          <Button title={`Submit`} onPress={() => submit()} color={`#fff`}></Button>
        </View>
      </View>
      <View style={[styles.row, styles.next]}>
        <View style={styles.controls}>  
          <Button title={`Reset`} onPress={() => reset()}></Button>
        </View>
      </View>
      <ConfettiCannon count={200} origin={{x: -10, y: 0}} ref={ref => (explosion: any = ref)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: "row"
  },
  counter: {
  },
  counterText: {
    fontSize: 96
  },
  lcdPanel: {
    alignItems: 'center',
    margin: 10,
    backgroundColor: "#f0f0f0",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    height: 42,
    width: 318,
    paddingTop: 6
  },
  lcdText: {
    color: "#000",
    fontSize: 24
  },
  full: {
    width: 318
  },
  submit: {
    backgroundColor: "blue",
    color: "#fff"
  },
  button: {
    alignContent: "center",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 8,
    margin: 4,
    minWidth: 100,
    minHeight: 40,
  },
  controls: {
    flexDirection: "row"
  },
  next: {
    marginTop: 64
  }
});
