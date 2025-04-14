import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigation/AppNavigation";
import store from "./src/hooks/redux_toolkit/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </>
  );
}
