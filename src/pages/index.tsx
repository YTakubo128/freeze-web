import Image from "next/image";
import { useRouter } from "next/router";
import { useForm} from "react-hook-form";
import { Theme, Box, Flex, Text, Button } from "@radix-ui/themes";
import { PlusIcon, MinusIcon, SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import "@radix-ui/themes/styles.css";

import style from "./styles.module.scss";


function Home() {
  const { register, setValue, watch, handleSubmit} = useForm({
    defaultValues: {
      isMuted: false,
    },
  });
  //音量調整
  const isMuted = watch("isMuted");
  const toggleMute = () => setValue("isMuted", !isMuted);
  return (
    <Theme>
      <Box>
        <Button onClick={toggleMute}>
          { isMuted ? <SpeakerOffIcon/> : <SpeakerLoudIcon/> }
        </Button>
      </Box>
      
    </Theme>
  );
}

export default Home;