import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  multiTimerContainer: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: "100%",
    height: "100%",
    fontSize: 10
  },
  favoriteAndTimerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  timerMainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  timerNumberButtonContainer: { flexDirection: "column", margin: 10 },
  timerButton: { margin: 2 },
  timer: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    flexDirection: "column",
    width: 100,
    fontSize: 10
  },
  button: { margin: 10 },
  text: { fontSize: 10, margin: 10 },
  alarmText: { fontSize: 20, margin: 10, color: "red" },
  functionalButtonContainer: {
    flexDirection: "row",
  },
  functionalButton: {
    backgroundColor: "#007bff",
    margin: 5,
    width: 100,
    height: 60,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  functionalButtonText: {
    color: "#fff",
    textAlign: "center",
    flexWrap: "wrap",
  }
});

export default Styles;