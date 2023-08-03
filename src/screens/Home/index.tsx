import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Keyboard, View } from "react-native";
import { styled } from "styled-components/native";
import ContainerUser from "../../components/ContainerUser";
import DrawerBack from "../../components/DrawerBack";
import { UserProps } from "../../components/props";
import api from "../../service/api";

const Home: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<UserProps[]>([]);

  const [msgErro, setMsgErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    Keyboard.dismiss();
    setUser([]);
    setLoading(true);

    try {
      const response = await api.get<UserProps[]>(`/${name}`);
      const item: UserProps[] = response.data;
      setUser(item);
    } catch (e) {
      setMsgErr("Nenhum usuário encontrado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <DrawerBack />
      <Header>
        <Logo source={require("../../assets/logo.png")} />

        <BoxInput>
          <Input
            value={name}
            placeholder="Search user"
            onChangeText={setName}
          />
          <Button onPress={handleSearch} activeOpacity={0.6}>
            <Ionicons name="search" size={26} />
          </Button>
        </BoxInput>
      </Header>

      {user.length != 0 ? (
        <View>
          <ContainerUser user={user} />
        </View>
      ) : loading ? (
        <Loading size={40} color={"blue"} />
      ) : (
        <NotFound>{msgErro}</NotFound>
      )}
    </Container>
  );
};

export default Home;

const Container = styled.View`
  flex: 1;
  background-color: #f5fffa;
`;

const Header = styled.View`
  background-color: #24292e;
  padding: 10px;
  padding-bottom: 15px;
`;

const Logo = styled.Image`
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

const Loading = styled.ActivityIndicator`
  margin-top: 20px;
`;

const NotFound = styled.Text`
  font-size: 19px;
  text-align: center;
  font-style: italic;
  margin-top: 30px;
`;
