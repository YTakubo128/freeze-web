import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Theme, Box, Text } from "@radix-ui/themes";
import styles from "./styles.module.scss";
import { use } from "react";

function Game() {
  const router = useRouter();
  // ルートからのデータをクエリで取得
  const { numOfPlayers, isMuted } = router.query;

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
        <Text>プレイヤー数:{numOfPlayers}</Text>
        <Text>ミュート:{isMuted === "true" ? "オン" : "オフ"}</Text>
        <Text>残り時間:{count}</Text>
      </Box>
    </Theme>
  );
}

export default Game;