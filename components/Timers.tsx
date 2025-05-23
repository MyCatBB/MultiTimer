import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button } from "react-native";
import Styles from "../styles/styles";

interface Timer {
  second: number;
  isRunning: boolean;
}

const MultiTimer = () => {
  const [timerNumber, setTimerNumber] = useState<number>(3);
  const initialTimers: Timer[] = [
    { second: 5, isRunning: false },
    { second: 15, isRunning: false },
    { second: 25, isRunning: false },
    { second: 35, isRunning: false },
    { second: 45, isRunning: false },
    { second: 55, isRunning: false },
  ];

  const [timers, setTimers] = useState<Timer[]>(initialTimers);
  const [alarm, setAlarm] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        return prevTimers.map((timer, index) => {
          if (!timer.isRunning || timer.second <= 0) return timer;

          const newSecond = timer.second - 1;

            if( newSecond === 0) {
                setAlarm((prevAlarm) => {
                    const newAlarm = [...prevAlarm];
                    newAlarm[index] = 'Alarm!';
                    return newAlarm;
                })
            }

          return {
            ...timer,
            second: newSecond < 0 ? 0 : newSecond,
            isRunning: newSecond <= 0 ? false : timer.isRunning,
          };
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerNumber]);

  const stopTimer = (index: number) => {
    setTimers((prev) => {
      const newTimers = [...prev];
      newTimers[index].isRunning = !newTimers[index].isRunning;
      return newTimers;
    });
  };

  const resetTimer = (index: number) => {
    const defaults = [5, 15, 25, 35, 45, 55];
    setAlarm([]);
    setTimers((prev) => {
      const newTimers = [...prev];
      newTimers[index] = { second: defaults[index], isRunning: false };
      return newTimers;
    });
  };

  return (
    <View style={Styles.timerContainer}>
      <View style={Styles.timerNumberButtonContainer}>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <View style={Styles.timerButton}>
            <Button
              key={num}
              title={`${num}`}
              onPress={() => setTimerNumber(num)}
            />
          </View>
        ))}
      </View>

      {timers.slice(0, timerNumber).map((timer, i) => (
        <View key={i} style={Styles.timer}>
          <Text
            style={Styles.text}
          >{`Timer ${i + 1}: ${timer.second} sec`}</Text>
          {alarm[i] && <Text style={Styles.alarmText}>{alarm[i]}</Text>}
          <View style={Styles.button}>
            <Button
              title={timer.isRunning ? "Stop" : "Start"}
              onPress={() => stopTimer(i)}
            />
          </View>
          <View style={Styles.button}>
            <Button title="Reset" onPress={() => resetTimer(i)} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default MultiTimer;
