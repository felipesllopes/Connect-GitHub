import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { styled } from "styled-components/native";

export default function DrawerBack() {
    
  const navigation = useNavigation();

  return (
    <Menu onPress={() => navigation.toggleDrawer()}>
      <Ionicons name="menu" size={30} color={"white"} />
    </Menu>
  );
}

const Menu = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  z-index: 2;
`;
