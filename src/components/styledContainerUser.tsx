import { styled } from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: white;
  margin: 10px;
  padding: 3px;
  border-radius: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  border-width: 2px;
  background-color: aliceblue;
`;

export const UserPhoto = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 50px;
  margin: 0 15px 0 5px;
`;

export const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const Text = styled.Text`
  font-size: 16px;
`;
