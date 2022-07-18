import 'react-native-gesture-handler';
import React, { useState } from "react";
import { UserContext } from "./src/contexts/userContext";
import { AppNavigator } from './src/navigation/AppNavigator';
// Types
import { User } from "./src/types/user";

// メイン
export default function App() {
  const [user, setUser] = useState<User | null>(null);

  // 
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppNavigator />
    </UserContext.Provider>
  );
}

