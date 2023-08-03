import { UserProps } from "../components/props";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Profile: { user: UserProps };
    }
  }
}
