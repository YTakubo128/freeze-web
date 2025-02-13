import Image from "next/image";
import { Theme, Box, Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import styles from "./styles.module.scss";
import { useRouter } from 'next/router';

const ClearPage = () => {
  const router = useRouter();

  return (
    <Theme>
      <Button onClick={() => router.push('/')}>スタートへ戻る</Button>
    </Theme>
  );
};

export default ClearPage;