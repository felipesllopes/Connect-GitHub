import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { styled } from "styled-components/native";

const Profile: React.FC = () => {
  
  const exibir = () => {
  };

  return (
    <Container>
      <Text>Tela Profile</Text>
      <TouchableOpacity onPress={exibir}>
        <Text>Pressione</Text>
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default Profile;
