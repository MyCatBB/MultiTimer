import { View } from "react-native";
import Styles from "./styles/styles";
import MultiTimer from "./components/Timers";

export default function App() {
  return (
    <View style={Styles.timerMainContainer}>
      <MultiTimer />
    </View>
  );
}
