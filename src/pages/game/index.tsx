import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Theme, Flex, Box, Text } from "@radix-ui/themes";
import styles from "./styles.module.scss";
import { use } from "react";

function Game() {
  const router = useRouter();
  // ルートからのデータをクエリで取得
  const { numOfPlayers, isMuted } = router.query;
  // クリア時に送信するデータ
  const { register, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      isCleared: false,
      remainTime: 0,
    },
  });

  // タイマーのカウントダウン処理
  const [count, setCount] = useState(10);
  useEffect(() => {
    if(count > 0){
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [count]);


  // 妨害演出

  return (
    <Theme>
      // 
      <Box>
        <Text as="p">プレイヤー数:{numOfPlayers}</Text>
        <Text as="p">ミュート:{isMuted === "true" ? "オン" : "オフ"}</Text>
        <Text as="p">残り時間:{count}</Text>
      </Box>
      <Box>
        <></>
      </Box>
    </Theme>
  );
}

export default Game;