//===================================================================
// フローティングボタンコンポーネント
//===================================================================
// インポート
//===================================================================
import React, { ComponentProps } from "react";
import {StyleSheet, TouchableOpacity, GestureResponderEvent,} from "react-native";
import { Feather } from "@expo/vector-icons";
type GlyphNames = ComponentProps<typeof Feather>['name'];
//===================================================================
// 固定値定義
//===================================================================
const SIZE = 56;
//===================================================================
// スタイルシート
//===================================================================
const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: "#900",
    position: "absolute",
    right: 16,
    bottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
//===================================================================
// 引数定義
//===================================================================
type Props = {
  iconName: GlyphNames;
  onPress: (event: GestureResponderEvent) => void;
};

//===================================================================
// メイン処理
//===================================================================
export const FloatingActionButton: React.FC<Props> = ({
  iconName,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Feather name={iconName} color="#fff" size={30} />
    </TouchableOpacity>
  );
};

