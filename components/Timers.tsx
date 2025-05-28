import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button } from "react-native";
import Styles from "../styles/styles";

interface Timer {
  second: number;
  minute: number;
  isRunning: boolean;
}

const MultiTimer = () => {
  const [timerNumber, setTimerNumber] = useState<number>(3);
  const initialTimers: Timer[] = [
    { minute: 5, second: 5, isRunning: false },
    { minute: 15, second: 15, isRunning: false },
    { minute: 25, second: 25, isRunning: false },
  ];

  const [timers, setTimers] = useState<Timer[]>(initialTimers);
  const [alarm, setAlarm] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = prevTimers.map((timer, index) => {
          if (!timer.isRunning) return timer;

          let { minute, second } = timer;

          if (minute === 0 && second === 0) {
            return { ...timer, isRunning: false };
          }

          if (second === 0) {
            if (minute > 0) {
              minute -= 1;
              second = 59;
            }
          } else {
            second -= 1;
          }

          return {
            ...timer,
            minute,
            second,
            isRunning: minute !== 0 || second !== 0,
          };
        });

        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleTimer = (index: number) => {
    setTimers((prev) => {
      return prev.map((timer, i) =>
        i === index ? { ...timer, isRunning: !timer.isRunning } : timer,
      );
    });
  };

  return (
    <View style={Styles.multiTimerContainer}>
      <View style={Styles.favoriteAndTimerContainer}>
        <View style={Styles.timerNumberButtonContainer}>
          {[1, 2, 3, 4, 5, 6].map((num, index) => (
            <View key={index} style={Styles.timerButton}>
              <Button title={`${num}`} onPress={() => setTimerNumber(num)} />
            </View>
          ))}
        </View>
        <View style={Styles.timerContainer}>
          {timers.slice(0, timerNumber).map((timer, i) => (
            <View>
              <View key={i} style={Styles.timer}>
                <Text
                  style={Styles.text}
                >{`Timer ${i + 1}: ${String(timer.minute).padStart(2, "0")} : ${String(timer.second).padStart(2, "0")}`}</Text>
                {alarm[i] && <Text style={Styles.alarmText}>{alarm[i]}</Text>}

                <View style={Styles.button}>
                  {/* <Button title="Reset" onPress={() => resetTimer(i)} /> */}
                </View>
              </View>
              <View style={Styles.button}>
                <Button
                  title={timer.isRunning ? "Pause" : "Start"}
                  onPress={() => toggleTimer(i)}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View>
        <Button title={"Start at the same time"} />
        <Button title={"Start one after the other"} />
        <Button title={"Start manually"} />
      </View>
    </View>
  );
};

export default MultiTimer;
