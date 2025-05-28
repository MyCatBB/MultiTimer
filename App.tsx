import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Styles from "./styles/styles";
import MultiTimer from "./components/Timers";

export default function App() {
  return (
    <View style={Styles.timerContainer}>
      <MultiTimer />
    </View>
  );
}
