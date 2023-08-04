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
        <Logo source={require("../../assets/logo3.png")} resizeMode="contain" />

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
        <View style={{ elevation: 10 }}>
          <ContainerUser user={user} />
        </View>
      ) : loading ? (
        <Loading size={40} color={'#000'}/>
      ) : (
        <NotFound>{msgErro}</NotFound>
      )}
    </Container>
  );
};

export default Home;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #daa520;
`;

const Header = styled.View`
  background-color: #24292e;
  padding: 10px;
  padding-bottom: 15px;
`;

const Logo = styled.Image`
  height: 62px;
  width: 300px;
  align-self: center;
  margin: 60px 0;
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
  margin-top: 30px;
`;

const NotFound = styled.Text`
  font-size: 19px;
  text-align: center;
  font-style: italic;
  margin-top: 30px;
`;
