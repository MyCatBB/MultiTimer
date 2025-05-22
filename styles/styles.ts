import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  timerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  timerNumberButtonContainer: { flexDirection: "row", margin: 30 },
  timerButton: { margin: 10 },
  timer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    flexDirection: "row",
    width: 500
  },
  button: { margin: 10 },
  text: { fontSize: 20, margin: 10 },
  alarmText: { fontSize: 20, margin: 10, color: "red" },
});

export default Styles;
