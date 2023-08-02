import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { styled } from "styled-components/native";
import ReposList from "../../components/ReposList";

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params?.item;
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.item.login,
    });

    (async () => {
      await axios.get(data.repos_url).then((repos) => {
        setRepos(repos.data);
      });
    })();
    console.log(repos);
  }, []);

  const renderList = ({ item }) => {
    return <ReposList item={item} />;
  };

  return (
    <Container>
      <ContainerUser>
        <Container2>
          <PhotoUser source={{ uri: data.avatar_url }} />

          <ContainerInfo>
            <Name>{data.name}</Name>
            <Login>{data.login}</Login>
            <Location>
              <Ionicons name="location" size={19} /> {data.location}
            </Location>
            <Id>Id: {data.id}</Id>
          </ContainerInfo>
        </Container2>
        <ContainerAdc>
          <BoxInfo>
            <InfoNum>{data.followers}</InfoNum>
            <Text>Seguidores</Text>
          </BoxInfo>
          <BoxInfo>
            <InfoNum>{data.following}</InfoNum>
            <Text>Seguindo</Text>
          </BoxInfo>
          <BoxInfo>
            <InfoNum>{data.public_repos}</InfoNum>
            <Text>Repositórios</Text>
          </BoxInfo>
        </ContainerAdc>
      </ContainerUser>

      <FlatList
        keyExtractor={(item) => item.id}
        data={repos}
        renderItem={renderList}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Profile;

const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: blueviolet;
`;

const Container2 = styled.View`
  border-width: 2px;
  border-color: yellow;
  flex-direction: row;
`;

const ContainerUser = styled.View`
  border-width: 2px;
  border-color: green;
`;

const PhotoUser = styled.Image`
  height: 110px;
  width: 110px;
  border-radius: 100px;
  margin: 10px;
`;

const ContainerInfo = styled.View`
  border-width: 2px;
  border-color: blue;
  flex: 1;
`;

const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const Login = styled.Text`
  font-size: 17px;
`;

const Location = styled.Text`
  font-size: 17px;
  margin: 5px 0;
`;

const Id = styled.Text`
  font-size: 16px;
`;

const ContainerAdc = styled.View`
  border-width: 2px;
  border-color: red;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`;

const BoxInfo = styled.View`
  border-width: 2px;
  border-color: orange;
  align-items: center;
`;

const InfoNum = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;
