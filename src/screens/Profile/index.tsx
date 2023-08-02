import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";
import ReposList from "../../components/ReposList";

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params?.item;
  const [repos, setRepos] = useState([]);
  const leg = [10, 2, 309, 30, 40, 39];

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.item.login,
    });

    (async () => {
      await axios.get<List>(data.repos_url).then((repos) => {
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
      <PhotoUser source={{ uri: data.avatar_url }} />

      <Text>{data.name}</Text>
      <Text>{data.login}</Text>
      <Text>{data.location}</Text>
      <Text>
        {data.followers} | {data.following}
      </Text>
      <Text>{data.id}</Text>
      <Text>{data.public_repos}</Text>

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

const PhotoUser = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 100px;
`;
