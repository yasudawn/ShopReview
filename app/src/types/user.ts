import {Timestamp }  from "firebase/firestore";

// ユーザ型
export type User = {
  id?: string;
  name: string;
  pushToken?: string;
  updatedAt: string;
  createdAt: string;
};

// 初期データ
export const initialUser: User = {
  name: "",
  updatedAt: "", //Timestamp.now(),
  createdAt: "", //Timestamp.now(),
};