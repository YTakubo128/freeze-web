import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Theme, Flex, Box, Text } from "@radix-ui/themes";
import { Progress } from "radix-ui";
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
  const [count, setCount] = useState(180);
  const [isBlackoutVisible, setIsBlackoutVisible] = useState(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const totalClicks = 10; // 10回クリックで解除
  //音声オブジェクトの作成
  const lightningSound = new Audio("/Electric_Shock06-1(Short).mp3");

  useEffect(() => {
    if (isBlackoutVisible) {
      return;
    }
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [count, isBlackoutVisible]);

  //確率で停電
  useEffect(() => {
    const blackoutTimer = setInterval(() => {
      if (Math.random() < 0.1) { // 10%の確率で暗転
        setIsBlackoutVisible(true);
      }
    }, 1000);
    return () => clearInterval(blackoutTimer);
  }, []);
  //停電中のクリック処理
  const handleBlackoutClick = () => {
    lightningSound.play();
    setClickCount((prevCount) => prevCount + 1);
    if (clickCount + 1 >= 10) { // 10回クリックで解除
      setIsBlackoutVisible(false);
      setClickCount(0);
    }
  };

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

  const progress = Math.floor((clickCount / totalClicks) * 100);

  useEffect(() => {
    const activePlayers = lifeDepleted.filter((depleted) => !depleted).length;
    console.log("Active players:", activePlayers); // Debugging line
    if (activePlayers === 1) {
      console.log("Redirecting to /clear"); // Debugging line
      router.push("/clear");
    }
  }, [lifeDepleted, router]);

  return (
    <Theme className={styles.page}>
      {isBlackoutVisible && (
        <div className={styles.blackout} onClick={handleBlackoutClick}>
          <Text className={styles.blackout__text}>停電中!! 連打して解除せよ！</Text>
          <Progress.Root className={styles.Progress__Root} value={progress}>
            <Progress.Indicator
              className={styles.Progress__Indicator}
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </div>
      )}
      <Box className={styles.remainTime}>
        <Text className={styles.remainTime__remain}>残</Text>
        <Text className={styles.remainTime__time}>{count}</Text>
        <Text className={styles.remainTime__byou}>秒</Text>
      </Box>
      <Flex className={styles.lifeCounter}>
        {Array.from({ length: numPlayers }).map((_, index) => (
          <div key={index}>
            <LifeCounter
              numOfPlayer={index + 1}
              onLifeDepleted={() => handleLifeDepleted(index)}
            />
          </div>
        ))}
      </Flex>
    </Theme>
  );
}

export default Game;