import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  multiTimerContainer: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: 500,
  },
  favoriteAndTimerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  timerNumberButtonContainer: { flexDirection: "column", margin: 30 },
  timerButton: { margin: 10 },
  timer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    flexDirection: "column",
    width: 100,
  },
  button: { margin: 10 },
  text: { fontSize: 20, margin: 10 },
  alarmText: { fontSize: 20, margin: 10, color: "red" },
});

export default Styles;
