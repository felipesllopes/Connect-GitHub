import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { styled } from "styled-components/native";
import ReposList from "../../components/ReposList";
import { UserProps } from "../../components/props";

type UserDetailsRouteProp = RouteProp<
  { Profile: { user: UserProps } },
  "Profile"
>;

const Profile: React.FC = () => {
  
  const route = useRoute<UserDetailsRouteProp>();
  const navigation = useNavigation();
  const { user } = route.params;
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: user?.name ? user?.name : "Usuário",
    });
    (async () => {
      try {
        const response = await axios.get(user.repos_url);
        setRepos(response.data);
      } catch (e) {
        console.log("Erro: " + e);
      }
    })();
  }, []);

  const renderList = ({ item }: { item: UserProps }) => {
    return <ReposList item={item} />;
  };

  const renderListMessage = () => {
    return <Loading size={40} color={"red"} />;
  };

  return (
    <Container>
      <ContainerUser>
        <Container2>
          <PhotoUser source={{ uri: user?.avatar_url }} />

          <ContainerInfo>
            <User>{user?.login}</User>

            <Id>Id: {user?.id}</Id>

            {user?.location !== null && (
              <Location>
                <Ionicons name="location" size={19} /> {user?.location}
              </Location>
            )}
          </ContainerInfo>
        </Container2>

        <ContainerAdc>
          <BoxInfo>
            <InfoNum>{user?.followers}</InfoNum>
            <Text>Seguidores</Text>
          </BoxInfo>
          <BoxInfo>
            <InfoNum>{user?.following}</InfoNum>
            <Text>Seguindo</Text>
          </BoxInfo>
          <BoxInfo>
            <InfoNum>{user?.public_repos}</InfoNum>
            <Text>Repositórios</Text>
          </BoxInfo>
        </ContainerAdc>
      </ContainerUser>

      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={repos}
        renderItem={renderList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderListMessage}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #24292e;
`;

const ContainerUser = styled.View`
  background-color: #f5fffa;
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

const User = styled.Text`
  font-size: 22px;
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

export default Profile;
