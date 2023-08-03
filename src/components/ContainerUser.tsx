import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { styled } from "styled-components/native";
import { UserProps } from "./props";

const ContainerUser: React.FC<any> = ({ user }: { user: UserProps }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("Profile", { user });
  };

  return (
    <Container activeOpacity={0.8} onPress={handleNavigation}>
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

const Container = styled.TouchableOpacity`
  background-color: white;
  margin: 10px;
  padding: 3px;
  border-radius: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  border-width: 2px;
  background-color: aliceblue;
`;

const UserPhoto = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 50px;
  margin: 0 15px 0 5px;
`;

const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Text = styled.Text`
  font-size: 16px;
`;
