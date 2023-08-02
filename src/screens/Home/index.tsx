import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Keyboard, View } from "react-native";
import { styled } from "styled-components/native";
import ContainerUser from "../../components/ContainerUser";
import { StackTypes } from "../../routes";
import api from "../../service/api";

interface Props {
  avatar_url: string;
  login: string;
  name: string;
  location: string;
  message: string;
}

const Home: React.FC<Props> = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState<Props | null>(null);
  const [msgErro, setMsgErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackTypes>();

  const handleSearch = async () => {
    Keyboard.dismiss();
    setUser(null);
    setLoading(true);

    await api
      .get<Props>(`/${name}`)
      .then((item) => {
        setUser(item.data);
      })
      .catch((e) => {
        setMsgErr("Nenhum usuário encontrado.");
      });
    setLoading(false);
  };

  function handleNavigation() {
    navigation.navigate("Profile", { item: user });
  }

  return (
    <Container>
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

      {user ? (
        <View>
          <ContainerUser user={user} handleNavigation={handleNavigation} />
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
  background-color: white;
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
