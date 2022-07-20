import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Image } from "react-native";
import { UserContext } from "../contexts/userContext";
import { pickImage } from "../lib/image-picker";
import { setDoc, Timestamp } from "firebase/firestore";
import { createReviewRef, uploadImage } from "../lib/Firebase";
import { getExtension } from "../utils/file";
/* components */
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { Review } from "../types/review";

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    photoContainer: {
        margin: 8,
    },
    image: {
        width: 100,
        height: 100,
        margin: 8,
    },
});

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
    route: RouteProp<RootStackParamList, "CreateReview">;
};

// Main
export const CreateReviewScreen: React.FC<Props> = ({ navigation, route }: Props) => {
    // 渡されたオブジェクト
    const { shop} = route.params;
    // ステート
    const [text, setText] = useState<string>("");
    const [score, setScore] = useState<number>(3);
    const [imageUri, setImageUri] = useState<string | null>("");
    const [loading, setLoading] = useState<boolean>(false);
    // コンテキスト
    const { user } = useContext(UserContext);
    //
    useEffect(() => {
        navigation.setOptions({
            title: shop.name,
            headerLeft: () => (
              <IconButton name="x" onPress={() => navigation.goBack()} />
            ),
          });
    }, [shop]);

    // 投稿処理
    const onSubmit = async () => {
        // ロード中を表示
        setLoading(true);
        // documentのIDを先に取得
        const reviewDocRef = await createReviewRef(shop.id!);
        //
        if(reviewDocRef) {
            if (imageUri) {
                // storageのpathを決定
                const ext = getExtension(imageUri!);
                const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
                // 画像をstorageにアップロード
                //const downloadUrl = await uploadImage(imageUri!, storagePath);
            }
            // レビュードキュメントの作成
            const review = {
                id: reviewDocRef.id,
                user: {
                name: user!.name,
                id: user!.id,
                },
                shop: {
                    name: shop.name,
                    id: shop.id,
                },
                // text:text の省略
                text,
                score,
                updatedAt:Timestamp.now(),
                createdAt:Timestamp.now(),
            } as Review
            // 書き込み
            await setDoc(reviewDocRef,review);
        }
        // ロード中を非表示
        setLoading(false);
        // 戻る
        navigation.goBack();
    }

    // 画像選択
    const onPickImage = async () => {
        const uri = await pickImage();
        setImageUri(uri);
      };
    // 画面表示
    return (
        <SafeAreaView style={styles.container}>
            <StarInput score={score} onChangeScore={(value) => setScore(value)} />
            <TextArea
                value={text}
                onChangeText={(value) => setText(value)}
                label="レビュー"
                placeholder="レビューを書いて下さい"
            />
            {/* <View style={styles.photoContainer}>
                <IconButton name="camera" onPress={onPickImage} color="#ccc" />
                {!!imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                )}
            </View> */}
            <Button text="レビューを投稿する" onPress={onSubmit} />
            <Loading visible={loading} />
        </SafeAreaView>
    );
};