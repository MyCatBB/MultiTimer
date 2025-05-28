import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, TextInput } from "react-native";
import Styles from "../styles/styles";

interface Timer {
  second: number;
  minute: number;
  isRunning: boolean;
}

const MultiTimer = () => {
  const initialTimers: Timer[] = [
    { minute: 1, second: 10, isRunning: false },
    { minute: 2, second: 10, isRunning: false },
    { minute: 3, second: 10, isRunning: false },
  ];

  const [userInput, setUserInput] = useState(
    Array(3).fill({ minute: "", second: "" }),
  );

  const [timerNumber, setTimerNumber] = useState<number>(3);
  const [displayButton, setDisplayButton] = useState<boolean>(false);

  const [timers, setTimers] = useState<Timer[]>(initialTimers);
  const [alarm, setAlarm] = useState<boolean[]>(new Array(3).fill(false));

  const [isAllRunning, setIsAllRunning] = useState(false);
  const [isSequentialRunning, setIsSequentialRunning] = useState(false);
  const [isManualRunning, setIsManualRunning] = useState(false);
  const [currentSeqIndex, setCurrentSeqIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = prevTimers.map((timer, index) => {
          if (!timer.isRunning) return timer;

          let { minute, second } = timer;
          const isFinished = minute === 0 && second === 0;

          if (second === 0) {
            if (minute > 0) {
              minute -= 1;
              second = 59;
            }
          } else {
            second -= 1;
          }

          if (isFinished) {
            setAlarm((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
            return { ...timer, isRunning: false };
          }

          return {
            ...timer,
            minute,
            second,
            isRunning: !isFinished,
          };
        });

        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isSequentialRunning || currentSeqIndex === null) return;

    const currentTimer = timers[currentSeqIndex];
    if (
      currentTimer.minute === 0 &&
      currentTimer.second === 0 &&
      !currentTimer.isRunning
    ) {
      const nextIndex = currentSeqIndex + 1;
      if (nextIndex < timers.length) {
        setTimers((prev) =>
          prev.map((t, index) =>
            index === nextIndex ? { ...t, isRunning: true } : t,
          ),
        );
        setCurrentSeqIndex(nextIndex);
      } else {
        setIsSequentialRunning(false);
        setCurrentSeqIndex(null);
      }
    }
  }, [timers, currentSeqIndex, isSequentialRunning]);

  const handleTimerInputChange = (
    index: number,
    field: "minute" | "second",
    value: string,
  ) => {
    const intValue = value === "" ? 0 : parseInt(value, 10);
    if (isNaN(intValue) || intValue < 0) return;

    if (field === "second" && intValue > 59) return;

    setTimers((prev) =>
      prev.map((timer, i) => {
        if (i !== index) return timer;

        if (isAllRunning || isSequentialRunning) {
          return timer;
        } else if (isManualRunning) {
          if (timer.isRunning) {
            return timer;
          }
        }

        return {
          ...timer,
          [field]: intValue,
        };
      }),
    );
  };

  const handleToggleSingleButton = (index: number) => {
    if (displayButton) {
      setTimers((prev) =>
        prev.map((timer, i) =>
          i === index ? { ...timer, isRunning: !timer.isRunning } : timer,
        ),
      );
      setIsManualRunning(true);
    } else {
      setIsManualRunning(false);
    }
  };

  const handleToggleDisplayOrStop = () => {
    if (!displayButton) {
      setDisplayButton(true);
    } else {
      const isAnyRunning = timers.some((t) => t.isRunning);
      if (isAnyRunning) {
        setTimers((prev) => prev.map((t) => ({ ...t, isRunning: false })));
      }
    }
  };

  const handleToggleAllButton = () => {
    if (isAllRunning) {
      setTimers((prev) => prev.map((t) => ({ ...t, isRunning: false })));
      setIsAllRunning(false);
    } else {
      setTimers((prev) => prev.map((t) => ({ ...t, isRunning: true })));
      setIsAllRunning(true);
      setIsSequentialRunning(false);
      setIsManualRunning(false);
      setCurrentSeqIndex(null);
    }
  };

  const handleToggleSequentialButton = () => {
    if (isSequentialRunning) {
      setTimers((prev) => prev.map((t) => ({ ...t, isRunning: false })));
      setIsSequentialRunning(false);
      setCurrentSeqIndex(null);
    } else {
      setTimers((prev) =>
        prev.map((t, index) => ({ ...t, isRunning: index === 0 })),
      );
      setIsSequentialRunning(true);
      setCurrentSeqIndex(0);
      setIsAllRunning(false);
      setIsManualRunning(false);
    }
  };

  return (
    <View style={Styles.multiTimerContainer}>
      {timers.map((timer, index) => (
        <View
          key={index}
          style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}
        >
          <Text>Timer {index + 1}:</Text>
          <TextInput
            style={{ borderWidth: 1, width: 60, padding: 5 }}
            keyboardType="numeric"
            placeholder="Min"
            value={timer.minute.toString()}
            onChangeText={(value) =>
              handleTimerInputChange(index, "minute", value)
            }
          />
          <TextInput
            style={{ borderWidth: 1, width: 60, padding: 5 }}
            keyboardType="numeric"
            placeholder="Sec"
            value={timer.second.toString()}
            onChangeText={(value) =>
              handleTimerInputChange(index, "second", value)
            }
          />
        </View>
      ))}

      <View style={Styles.favoriteAndTimerContainer}>
        <View style={Styles.timerNumberButtonContainer}>
          {[1, 2, 3, 4, 5, 6].map((num, index) => (
            <View key={index} style={Styles.timerButton}>
              <Button title={`${num}`} onPress={() => setTimerNumber(num)} />
            </View>
          ))}
        </View>
        <View style={Styles.timerContainer}>
          {timers.slice(0, timerNumber).map((timer, index) => (
            <View>
              <View key={index} style={Styles.timer}>
                <Text
                  style={Styles.text}
                >{`Timer ${index + 1} ${String(timer.minute).padStart(2, "0")} : ${String(timer.second).padStart(2, "0")}`}</Text>
                {alarm[index] && (
                  <Text style={Styles.alarmText}>
                    Timer {index + 1} finished!
                  </Text>
                )}

                <View style={Styles.button}>
                  {/* <Button title="Reset" onPress={() => resetTimer(i)} /> */}
                </View>
              </View>
              <View style={Styles.button}>
                {displayButton && (
                  <Button
                    title={timer.isRunning ? "Pause" : "Start"}
                    onPress={() => handleToggleSingleButton(index)}
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View>
        <Button
          onPress={handleToggleAllButton}
          title={isAllRunning ? "Pause" : "Start at the same time"}
        />
        <Button
          onPress={handleToggleSequentialButton}
          title={isSequentialRunning ? "Pause" : "Start one after the other"}
        />
        <Button
          // onPress={() => setDisplayButton(true)}
          onPress={() => handleToggleDisplayOrStop()}
          title={isManualRunning ? "Pause" : "Start manually"}
        />
      </View>
    </View>
  );
};

export default MultiTimer;
