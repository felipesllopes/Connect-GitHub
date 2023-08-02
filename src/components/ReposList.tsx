import { format } from "date-fns";
import { Linking, View } from "react-native";
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
      <Box>
        <Name>{item.name}</Name>
        <Language>{item.language}</Language>
      </Box>
      {item.description !== null ? (
        <Description>Descrição: {item.description}</Description>
      ) : <View/>}
      <Data>
        Atualização: {format(new Date(item.pushed_at), "dd/MM/yyyy HH:mm")}
      </Data>
      <Data>
        Criação: {format(new Date(item.created_at), "dd/MM/yyyy HH:mm")}
      </Data>
    </Container>
  );
};

export default ReposList;

const Container = styled.TouchableOpacity`
  background-color: #f5fffa;
  margin: 10px;
  border-radius: 20px;
  padding: 10px;
`;

const Box = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
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

const Data = styled.Text`
  font-size: 15px;
`;
