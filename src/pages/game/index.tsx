import Image from "next/image";
import { useRouter } from "next/router";
import { Theme, Box, Text } from "@radix-ui/themes";
import styles from "./styles.module.scss";
import { use } from "react";

function Game() {
  const router = useRouter();
  // ルートからのデータをクエリで取得
  const { numOfPlayers, isMuted } = router.query;
  return (
    <Theme>
      <Box>
        <Text>プレイヤー数:{numOfPlayers}</Text>
        <Text>ミュート:{isMuted === "true" ? "オン" : "オフ"}</Text>
      </Box>
    </Theme>
  );
}

export default Game;