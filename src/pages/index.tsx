import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Theme, Box, Flex, Text, Button } from "@radix-ui/themes";
import { PlusIcon, MinusIcon, SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import "@radix-ui/themes/styles.css";

import style from "./styles.module.scss";


function Home() {
  const router = useRouter();
  //setting周り
  const { register, setValue, watch, handleSubmit} = useForm({
    defaultValues: {
      numOfPlayers: 4,
      isMuted: false,
    },
  });

  //プレイヤー数の増減
  const numOfPlayers = watch("numOfPlayers");
  const incrementPlayers = () => {
    if(numOfPlayers < 4) setValue("numOfPlayers", numOfPlayers + 1);
  };

  const decrementPlayers = () => {
    if(numOfPlayers > 1) setValue("numOfPlayers", numOfPlayers - 1);
  };
  //音量調整
  const isMuted = watch("isMuted");
  const toggleMute = () => setValue("isMuted", !isMuted);

  //送信
  const onSubmit = (data: any) => {
    router.push({
      pathname: "/game",
      query: data,
    });
  };

  return (
    <Theme className={style.page}>
      <Box className={style.setVolume}>
        <Button onClick={toggleMute} radius="full">
          { isMuted ? <SpeakerOffIcon/> : <SpeakerLoudIcon/> }
        </Button>
      </Box>
      <Box className={style.setPlayers}>
        <Text>プレイ人数を選択してください</Text>
        <Flex className={style.setPlayers__counter} align="center">
          <Button onClick={decrementPlayers} radius="full"><MinusIcon/></Button>
          <Text className={style.setPlayers__counter__text}>{numOfPlayers}</Text>
          <Button onClick={incrementPlayers} radius="full"><PlusIcon/></Button>
        </Flex>
      </Box>
      
      <Box className={style.startGame}>
        <Text>看守と囚人はそれぞれの配置についてください。</Text>
        <Button onClick={handleSubmit(onSubmit)} radius="full">スタート</Button>
      </Box>
    </Theme>
  );
}

export default Home;