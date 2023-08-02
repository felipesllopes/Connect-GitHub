import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View } from "react-native";
import { Container, Text, UserName, UserPhoto } from "./styledContainerUser";

interface Props {
  user: object;
  handleNavigation: Function;
}

const ContainerUser: React.FC<Props> = ({ user, handleNavigation }) => {
  return (
    <Container activeOpacity={0.8} onPress={() => handleNavigation()}>
      <UserPhoto source={{ uri: user.avatar_url }} />
      <View>
        <UserName>{user.name}</UserName>
        <Text>{user.login}</Text>
        <Text>
          <Ionicons name="location" size={20} /> {user.location}
        </Text>
      </View>
    </Container>
  );
};

export default ContainerUser;
