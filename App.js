import React, { useContext } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Context, { NewsContext } from "./API/Context";
import InshortTabs from "./components/InshortTabs";

// export default function App() {
function App() {
  const { darkTheme } = useContext(NewsContext);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: darkTheme ? "#282C35" : "white",
      }}
    >
      {/* styles'ı bu şekilde hazırlamamızın sebebi, ileride dark mode vb. ekleme
      durumu */}
      <InshortTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

// context 4 için bu şekilde Context içine app'ı al, her yerden Context'e ulaşılabilsin,
export default () => {
  return (
    <Context>
      <App />
    </Context>
  );
};
