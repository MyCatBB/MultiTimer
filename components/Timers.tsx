import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import Styles from "../styles/styles";

interface Timer {
  second: number;
  minute: number;
  isRunning: boolean;
  name: string;
  id: number;
}

const MultiTimer = () => {
  const initialTimers: Timer[] = [
    { id: 0, minute: 1, second: 10, isRunning: false, name: "신라면" },
    { id: 1, minute: 2, second: 10, isRunning: false, name: "짜파게티" },
    { id: 2, minute: 3, second: 10, isRunning: false, name: "비빔면" },
  ];

  // const [userInput, setUserInput] = useState(
  //   Array(3).fill({ minute: "", second: "" }),
  // );

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
        const newTimers = prevTimers.map((timer) => {
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
              updated[timer.id] = true;
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
          prev.map((timer) =>
            timer.id === nextIndex ? { ...timer, isRunning: true } : timer,
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
    id: number,
    field: "minute" | "second" | "name",
    value: string,
  ) => {
    let newValue: string | number = value;

    if (field === "minute" || field === "second") {
      const intValue = value === "" ? 0 : parseInt(value, 10);
      if (isNaN(intValue) || intValue < 0) return;

      if (field === "second" && intValue > 59) return;

      newValue = intValue;
    }

    setTimers((prev) =>
      prev.map((timer) => {
        // if (i !== index) return timer;

        if (isAllRunning || isSequentialRunning || (isManualRunning && timer.isRunning)) {
        return timer;
      }

        return {
          ...timer,
          [field]: newValue,
        };
      }),
    );
  };

  const handleToggleSingleButton = (index: number) => {
    if (displayButton) {
      setTimers((prev) =>
        prev.map((timer) =>
          timer.id === index ? { ...timer, isRunning: !timer.isRunning } : timer,
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
      setDisplayButton(false);
    }
  };

  const handleToggleSequentialButton = () => {
    if (isSequentialRunning) {
      setTimers((prev) => prev.map((t) => ({ ...t, isRunning: false })));
      setIsSequentialRunning(false);
      setCurrentSeqIndex(null);
    } else {
      setTimers((prev) =>
        prev.map((t) => ({ ...t, isRunning: t.id === 0 })),
      );
      setIsSequentialRunning(true);
      setCurrentSeqIndex(0);
      setIsAllRunning(false);
      setIsManualRunning(false);
      setDisplayButton(false);
    }
  };

  //   const resetTimer = (index: number) => {
  //   const defaults = [5, 15, 25, 35, 45, 55];
  //   setTimers((prev) => {
  //     const newTimers = [...prev];
  //     newTimers[index] = { second: defaults[index], isRunning: false };
  //     return newTimers;
  //   });
  // };

  return (
    <View style={Styles.multiTimerContainer}>
      {timers.map((timer) => (
        <View
          key={timer.id}
          style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}
        >
          <Text>Timer</Text>
          <TextInput
            style={{ borderWidth: 1, width: 60, padding: 5 }}
            keyboardType="numeric"
            placeholder="Min"
            value={timer.minute.toString()}
            onChangeText={(value) =>
              handleTimerInputChange(timer.id, "minute", value)
            }
          />
          <TextInput
            style={{ borderWidth: 1, width: 60, padding: 5 }}
            keyboardType="numeric"
            placeholder="Sec"
            value={timer.second.toString()}
            onChangeText={(value) =>
              handleTimerInputChange(timer.id, "second", value)
            }
          />
          <TextInput
            style={{ borderWidth: 1, width: 60, padding: 5 }}
            value={timer.name}
            onChangeText={(text) => handleTimerInputChange(timer.id, "name", text)}
            placeholder={`Timer ${timer.id + 1}`}
          />
        </View>
      ))}

      <View style={Styles.favoriteAndTimerContainer}>
        <View style={Styles.timerNumberButtonContainer}>
          {[1, 2, 3, 4, 5, 6].map((num, index) => (
            <View key={index} style={Styles.timerButton}>
              <Button title={`${num}`} onPress={() => {}} />
            </View>
          ))}
        </View>
        <View style={Styles.timerMainContainer}>
          <View style={Styles.timerContainer}>
            {timers.slice(0, timerNumber).map((timer) => (
              <View>
                <View key={timer.id} style={Styles.timer}>
                  {/* <Text
                  style={Styles.text}
                >{`${timer.name} ${String(timer.minute).padStart(2, "0")} : ${String(timer.second).padStart(2, "0")}`}</Text> */}
                  <Text style={Styles.text}>{timer.name}</Text>
                  <Text style={Styles.text}>
                    {`${String(timer.minute).padStart(2, "0")} : ${String(timer.second).padStart(2, "0")}`}
                  </Text>
                  {alarm[timer.id] && (
                    <Text style={Styles.alarmText}>{timer.name} finished!</Text>
                  )}

                  <View style={Styles.button}>
                    {/* <Button title="Reset" onPress={() => resetTimer(i)} /> */}
                  </View>
                </View>
                <View style={Styles.button}>
                  {displayButton && (
                    <Button
                      title={timer.isRunning ? "Pause" : "Start"}
                      onPress={() => handleToggleSingleButton(timer.id)}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
          <View style={Styles.functionalButtonContainer}>
            <TouchableOpacity
              onPress={handleToggleAllButton}
              style={Styles.functionalButton}
            >
              <Text style={Styles.functionalButtonText}>
                {isAllRunning ? "Pause" : "Start\n at the same time"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleToggleSequentialButton}
              style={Styles.functionalButton}
            >
              <Text style={Styles.functionalButtonText}>
                {isSequentialRunning ? "Pause" : "Start\n one after the other"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleToggleDisplayOrStop}
              style={Styles.functionalButton}
            >
              <Text style={Styles.functionalButtonText}>
                {isManualRunning ? "Pause" : "Start\n manually"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MultiTimer;
