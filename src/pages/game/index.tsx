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
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [count]);

  // プレイヤー処理
  const numPlayers = Number(numOfPlayers);
  const [lifeDepleted, setLifeDepleted] = useState<boolean[]>(numPlayers > 0 ? Array(numPlayers).fill(false) : []);

  const handleLifeDepleted = (index: number) => {
    setLifeDepleted((prev) => {
      if (!prev[index]) {
        const newLifeDepleted = [...prev];
        newLifeDepleted[index] = true;
        return newLifeDepleted;
      }
      return prev;
    });
  };

  useEffect(() => {
    const activePlayers = lifeDepleted.filter((depleted) => !depleted).length;
    console.log("Active players:", activePlayers); // Debugging line
    if (activePlayers === 1) {
      console.log("Redirecting to /clear"); // Debugging line
      router.push("/clear");
    }
  }, [lifeDepleted, router]);

  // 妨害演出
  return (
    <Theme>
      <Box>
        <Text as="p">ミュート: {isMuted === "true" ? "オン" : "オフ"}</Text>
        <Text as="p">残り時間: {count}</Text>
      </Box>
      <Flex gap="10px">
        {Array.from({ length: numPlayers }).map((_, index) => (
          <div key={index}>
            <LifeCounter
              numOfPlayer={index + 1}
              onLifeDepleted={() => handleLifeDepleted(index)}
            />
            {lifeDepleted[index] && <p>Player {index + 1}'s life is depleted!</p>}
          </div>
        ))}
      </Flex>
    </Theme>
  );
}

export default Game;