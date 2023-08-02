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
  }, []);

  const renderList = ({ item }) => {
    return <ReposList item={item} />;
  };

  const renderListMessage = () => {
    return <Loading size={40} color={"red"} />;
  };

  return (
    <Container>
      <ContainerUser>
        <Container2>
          <PhotoUser source={{ uri: data.avatar_url }} />

          <ContainerInfo>
            {data.name !== null && <Name>{data.name}</Name>}

            <Id>Id: {data.id}</Id>

            {data.location !== null && (
              <Location>
                <Ionicons name="location" size={19} /> {data.location}
              </Location>
            )}
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
        ListEmptyComponent={renderListMessage}
      />
    </Container>
  );
};

export default Profile;

const Container = styled.View`
  flex: 1;
  background-color: #24292e;
`;

const ContainerUser = styled.View`
  background-color: white;
  padding-bottom: 10px;
  border-bottom-width: 2px;
`;

const Container2 = styled.View`
  flex-direction: row;
`;

const PhotoUser = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  margin: 15px;
`;

const ContainerInfo = styled.View`
  flex: 1;
  padding: 7px;
`;

const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-top: 5px;
`;

const Id = styled.Text`
  font-size: 16px;
  margin-top: 5px;
`;

const Location = styled.Text`
  font-size: 17px;
  margin-top: 5px;
`;

const ContainerAdc = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 5px;
`;

const BoxInfo = styled.View`
  align-items: center;
`;

const InfoNum = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const Loading = styled.ActivityIndicator`
  margin-top: 50%;
`;
