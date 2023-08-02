import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Keyboard, View } from "react-native";
import { styled } from "styled-components/native";
import { StackTypes } from "../../routes";
import api from "../../service/api";

interface Props {
  avatar_url: string;
  login: string;
  name: string;
  location: string;
  message: string;
}

const Home = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState<Props | null>(null);

  const navigation = useNavigation<StackTypes>();

  const handleSearch = async () => {
    Keyboard.dismiss();
    setUser(null);

    await api
      .get<Props>(`/${name}`)
      .then((item) => {
        setUser(item.data);
        console.log(item.data);
      })
      .catch((e) => {
        console.log("Erro");
      });
  };

  function handleNavigation() {
    navigation.navigate("Profile", { item: user });
  }

  return (
    <Container>
      <Logo source={require("../../assets/logo.png")} />

      <BoxInput>
        <Input value={name} placeholder="Search user" onChangeText={setName} />
        <Button onPress={handleSearch} activeOpacity={0.6}>
          <Ionicons name="search" size={26} />
        </Button>
      </BoxInput>

      {user && (
        <ContainerData activeOpacity={0.8} onPress={handleNavigation}>
          <UserPhoto source={{ uri: user.avatar_url }} />
          <View>
            <UserName>{user.name}</UserName>
            <UserLogin>{user.login}</UserLogin>
            <UserLocation>
              <Ionicons name="location" size={20} /> {user.location}
            </UserLocation>
          </View>
        </ContainerData>
      )}
    </Container>
  );
};

export default Home;

const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #24292e;
`;

const Logo = styled(Image)`
  height: 160px;
  width: 160px;
  align-self: center;
  margin: 10px;
  margin-bottom: 30px;
`;

const BoxInput = styled.View`
  flex-direction: row;
  background-color: white;
  align-items: center;
  border-radius: 10px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 20px;
  margin-left: 10px;
`;

const Button = styled.TouchableOpacity`
  padding: 5px 12px;
`;

const ContainerData = styled.TouchableOpacity`
  background-color: white;
  margin: 10px;
  padding: 3px;
  border-radius: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
const UserPhoto = styled(Image)`
  height: 70px;
  width: 70px;
  border-radius: 50px;
  margin: 0 15px 0 5px;
`;

const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const UserLogin = styled.Text`
  font-size: 16px;
`;

const UserLocation = styled.Text`
  font-size: 16px;
`;

const Message = styled.Text`
  font-size: 19px;
  color: white;
  text-align: center;
  font-style: italic;
`;
