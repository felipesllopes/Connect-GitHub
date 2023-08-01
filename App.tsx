import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import Route from "./src/routes";

export default function App() {
  return (
    <Container>
      <Route />
      <StatusBar />
    </Container>
  );
}

const Container = styled(NavigationContainer)`
  flex: 1;
`;
