import Image from "next/image";
import { useRouter } from "next/router";
//import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Theme, Flex, Box, Text, Button } from "@radix-ui/themes";
import { Progress } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import "@radix-ui/themes/styles.css";
import styles from "./styles.module.scss";

import LifeCounter from "@/components/composite/life-counter";

function Game() {
  const router = useRouter();
  // ルートからのデータをクエリで取得
  const { numOfPlayers } = router.query;
  // クリア時に送信するデータ
  // const { register, setValue, watch, handleSubmit } = useForm({
  //   defaultValues: {
  //     isCleared: false,
  //     remainTime: 0,
  //   },
  // });

  // タイマーのカウントダウン処理
  const [count, setCount] = useState(10);
  const [isBlackoutVisible, setIsBlackoutVisible] = useState(false);
  const [isAdsenseVisible, setIsAdsenseVisible] = useState(false);
  const [isPhoneCallVisible, setIsPhoneCallVisible] = useState(false);
  const [isPhoneCallingVisible] = useState(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const totalClicks = 10; // 10回クリックで解除
  //音声オブジェクトの作成
  const lightningSound = new Audio("/sound/Electric_Shock06-1(Short).mp3");
  const error = new Audio("/sound/error.mp3");
  const alert90Sound = new Audio("/sound/sec90.mp3");
  const alert120Sound = new Audio("/sound/sec120.mp3");
  const alert150Sound = new Audio("/sound/sec150.mp3");
  const callendSound = new Audio("/sound/callend.mp3");
  const callmelo = new Audio("/sound/callmelo (mp3cut.net).mp3");
  callmelo.volume = 0.5;
  const call = new Audio("/sound/call.mp3");
  call.volume = 1;


  useEffect(() => {
    if (isBlackoutVisible || isAdsenseVisible || isPhoneCallVisible || isPhoneCallingVisible) {
      return;
    }
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      router.push("/clear");
    }
  }, [count, isBlackoutVisible, isAdsenseVisible, isPhoneCallVisible, isPhoneCallingVisible]);

  useEffect(() => {
    if(count === 90){
      if(alert90Sound) alert90Sound.play();
    }
    if(count === 60){
      if(alert120Sound) alert120Sound.play();
    }
    if(count === 30){
      if(alert150Sound) alert150Sound.play();
    }
  }, [count]);

  //確率で停電
  useEffect(() => {
    const blackoutTimer = setInterval(() => {
      if ( isBlackoutVisible || isAdsenseVisible || isPhoneCallVisible || isPhoneCallingVisible) {
        return;
      }
      if (Math.random() < 0.1) { // 10%の確率でイベント発生
        if (Math.random() < 0.33) {
          if (error) error.play();
          setIsBlackoutVisible(true);
        } else if (Math.random() < 0.5) {
          if (error) error.play();
          setIsAdsenseVisible(true);
        } else {
          if (callmelo) callmelo.play();
          setIsPhoneCallVisible(true);
        }
      }
    }, 1000);
    return () => clearInterval(blackoutTimer);
  }, [isBlackoutVisible, isAdsenseVisible, isPhoneCallVisible, isPhoneCallingVisible]);
  //停電中のクリック処理
  const handleBlackoutClick = () => {
    if(lightningSound) lightningSound.play();
    setClickCount((prevCount) => prevCount + 1);
    if (clickCount + 1 >= 10) { // 10回クリックで解除
      setIsBlackoutVisible(false);
      setClickCount(0);
    }
  };
  //広告を閉じる処理
  const handleCloseAdsense = () => {
    setIsAdsenseVisible(false);
  };
  //電話を閉じる処理
  const handleClosePhoneCall = () => {
    setIsPhoneCallVisible(false);
    if(callmelo && callmelo.currentTime > 0 && !callmelo.paused){
      console.log("callmelo is stop"); // Debugging line
      console.log("callmelo before pause:", callmelo); // Debugging line
      callmelo.pause();
      callmelo.currentTime = 0;
      console.log("callmelo paused:", callmelo.paused); // Debugging line
      console.log("callmelo currentTime:", callmelo.currentTime); // Debugging line
    } else {
      callmelo.pause();
      console.log("callmelo is either null or already paused");
      console.log("callmelo object:", callmelo); // Debugging line
    }
    if(callendSound) callendSound.play();
    if(call) call.play();
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
      {isAdsenseVisible && (
        <div className={styles.adsense}>
          <div className={styles.adsense__content}>
          <Text className={styles.adsense__text}>これは偽物の広告です！</Text>
          <Image
            src="/img/adsense.png"
            alt="Fake Ad"
            width={350}
            height={250}
            className={styles.adsense__image}
          />

          <Button onClick={handleCloseAdsense} className={styles.adsense__close}><Cross2Icon/></Button>
          </div>
        </div>
      )}
      {isPhoneCallVisible && (
        <div className={styles.phoneCall}>
          <div className={styles.phoneCall__content}>
            <Text className={styles.phoneCall__text}>偽の電話がかかってきました！</Text>
            <Button onClick={handleClosePhoneCall} className={styles.phoneCall__up}>
            <svg 
              version="1.1" 
              id="_x32_" 
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{width: 256, height: 256, opacity: 1}} xmlSpace="preserve">
              <style type="text/css">
                {`.st0{fill:#4B4B4B;}`}
              </style>
              <g>
                <path className="st0" d="M94.811,21.696c-35.18,22.816-42.091,94.135-28.809,152.262c10.344,45.266,32.336,105.987,69.42,163.165
                  c34.886,53.79,83.557,102.022,120.669,129.928c47.657,35.832,115.594,58.608,150.774,35.792
                  c17.789-11.537,44.218-43.058,45.424-48.714c0,0-15.498-23.896-18.899-29.14l-51.972-80.135
                  c-3.862-5.955-28.082-0.512-40.386,6.457c-16.597,9.404-31.882,34.636-31.882,34.636c-11.38,6.575-20.912,0.024-40.828-9.142
                  c-24.477-11.262-51.997-46.254-73.9-77.947c-20.005-32.923-40.732-72.322-41.032-99.264c-0.247-21.922-2.341-33.296,8.304-41.006
                  c0,0,29.272-3.666,44.627-14.984c11.381-8.392,26.228-28.286,22.366-34.242l-51.972-80.134c-3.401-5.244-18.899-29.14-18.899-29.14
                  C152.159-1.117,112.6,10.159,94.811,21.696z" style={{ fill: "rgb(255, 255, 255)" }}></path>
              </g>
            </svg>
            </Button>
          </div>
        </div>
      )}
      {isPhoneCallingVisible && (
        <div className={styles.phoneCall}>

        </div>
      )}

      
      <Image
        src="/img/watch.png"
        alt="active watch"
        width={200}
        height={200}
        className={styles.watch}
      />
      <Box className={styles.remainTime}>
        <Text className={styles.remainTime__remain}>残</Text>
        <Text className={styles.remainTime__time}>{count}</Text>
        <Text className={styles.remainTime__byou}>秒</Text>
      </Box>
      <p className={styles.lifeCounter__txt}>囚人が動いたら指摘してボタンを押してください</p>
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