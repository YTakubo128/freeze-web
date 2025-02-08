import Image from "next/image";
import { useRouter } from "next/router";
import { useForm} from "react-hook-form";
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
    router.push("/game");
  };

  return (
    <Theme>
      <Box>
        <Button onClick={toggleMute}>
          { isMuted ? <SpeakerOffIcon/> : <SpeakerLoudIcon/> }
        </Button>
      </Box>
      <Box>
        <Text>プレイ人数を選択してください</Text>
        <Flex>
          <Button onClick={decrementPlayers}><MinusIcon/></Button>
          <Text>{numOfPlayers}</Text>
          <Button onClick={incrementPlayers}><PlusIcon/></Button>
        </Flex>
      </Box>
      
      <Box>
        <Text>看守と囚人はそれぞれの配置についてください。</Text>
        <Button onClick={handleSubmit(onSubmit)}>スタート</Button>
      </Box>
    </Theme>
  );
}

export default Home;