import {Platform} from "react-native";
import * as ImagePicker from "expo-image-picker";

const getCameraRollPermission = async () => {
    return;
  if (Platform.OS === "ios") {
    const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log("granted:" + granted);
    if (granted === false) {
      alert("画像を選択するためにはカメラロールの許可が必要です");
    }
  }
};

export const pickImage = async () => {
  // パーミッションを取得
  await getCameraRollPermission();
  // ImagePicker起動
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
  });
  if (!result.cancelled) {
    //console.log(result.uri);
    return result.uri;
  }
  return null;
};