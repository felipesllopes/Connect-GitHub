import { View, Text, TouchableOpacity, Linking } from "react-native";
import { styled } from "styled-components/native";

const ReposList = ({ item }) => {
  const click = async () => {
    console.log(item.html_url);
    const supported = await Linking.canOpenURL(item.html_url);

    if (supported) {
      await Linking.openURL(item.html_url);
    } else {
      console.warn("Erro ao tentar abrir link");
    }
  };

  return (
    <Container onPress={click} activeOpacity={0.8}>
      <Name>{item.name}</Name>
      <Language>{item.language}</Language>
      <Description>Descrição: {item.description}</Description>
      <Text>{item.created_at}</Text>
      <Text>{item.updated_at}</Text>
    </Container>
  );
};

export default ReposList;

const Container = styled.TouchableOpacity`
  background-color: aqua;
  margin: 10px;
  border-radius: 20px;
  padding: 10px;
`;

const Name = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

const Language = styled.Text`
  font-style: italic;
  font-size: 15px;
`;

const Description = styled.Text`
  font-size: 16px;
`;
