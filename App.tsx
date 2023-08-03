import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import styled from "styled-components/native";
import DrawerRoute from "./src/routes/drawerRoute";

export default function App() {
  return (
    <Container>
      <DrawerRoute />
      <StatusBar />
    </Container>
  );
}

const Container = styled(NavigationContainer)`
  flex: 1;
`;
