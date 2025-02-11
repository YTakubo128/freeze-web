import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Theme, Flex, Box, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import styles from "./styles.module.scss";

import LifeCounter from "@/components/composite/life-counter";

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
      <Box>
        <Text as="p">ミュート:{isMuted === "true" ? "オン" : "オフ"}</Text>
        <Text as="p">残り時間:{count}</Text>
      </Box>
      <Flex gap="10px">
        {Array.from({ length: Number(numOfPlayers) }).map((_, index) => (
          <LifeCounter key={index} numOfPlayer={index + 1} />
        ))}
      </Flex>
    </Theme>
  );
}

export default Game;