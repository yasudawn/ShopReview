import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Platform ,StatusBar ,Text } from "react-native";
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
import { createReviewRef } from "../lib/Firebase";
import { Shop } from "../types/Shop"
import { UserContext } from "../contexts/userContext";
import { Review } from "../types/review";
import { setDoc, Timestamp } from "firebase/firestore";

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

        // Android 対応
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
        if(!reviewDocRef) {return;}
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
        // ロード中を非表示
        setLoading(false);
    }

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
            <Button text="レビューを投稿する" onPress={onSubmit} />
            <Loading visible={loading} />
        </SafeAreaView>
    );
};