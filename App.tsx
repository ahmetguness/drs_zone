import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigation/AppNavigation";

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <AppNavigation />
    </>
  );
}
