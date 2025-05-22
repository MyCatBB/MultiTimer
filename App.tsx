import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Styles from "./styles/styles";
import Timers from "./components/Timers";

export default function App() {
  // const [second, setSecond] = useState<number>(5);
  // const [isRunning, setIsRunning] = useState<boolean>(false);
  // const timerRef = useRef<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   if(second <= 0){
  //     setIsRunning(false);
  //     if(timerRef.current) {
  //       clearInterval(timerRef.current);
  //       timerRef.current = null;
  //     }
  //     setSecond(0);
  //     return;
  //   }
  //   if(isRunning) {
  //     timerRef.current = setInterval(() => {
  //       setSecond(prev => prev -1);
  //     }, 1000)
  //   } else {
  //     if(timerRef.current) {
  //       clearInterval(timerRef.current);
  //       timerRef.current = null;
  //     }
  //   }

  //   return () => {
  //     if(timerRef.current) {
  //       clearInterval(timerRef.current);
  //       timerRef.current = null;
  //     }
  //   }
  // }, [isRunning, second])

  // const handleReset = () => {
  //   setIsRunning(false);
  //   setSecond(5);
  // };

  // return (
  //   <View style={Styles.container}>
  //     <Text style={Styles.text}>{second}sec</Text>
  //     <Button title={isRunning ? "Stop" : "Start"} onPress={() => setIsRunning(prev => !prev)} />
  //       <View style={{marginTop: 10}}>
  //         <Button title="Reset" onPress={handleReset}/>
  //       </View>
  //   </View>
  // )
  return <Timers />;
}
