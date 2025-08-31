import { atom } from "recoil";
import {recoilPersist} from 'recoil-persist'
import type { LoginType } from "./Types";

const { persistAtom } = recoilPersist();

export const loginState = atom<LoginType>({
  key: "loginState",
  default: {
    loggedIn: false,
    token: "",
    message: "",
    userData: {
      id: "",
      email: "",
      username: "",
    },
  },
  effects_UNSTABLE: [persistAtom],
});
