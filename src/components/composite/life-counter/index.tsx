import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Theme, Box, Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { HeartFilledIcon, Cross2Icon } from "@radix-ui/react-icons";
import styles from "./styles.module.scss";

interface LifeCounterProps {
  numOfPlayer: number;
}

function LifeCounter({ numOfPlayer }: LifeCounterProps) {
  const [life, setLife] = useState(3);

  const decrementLife = () => {
    if(life > 0) setLife(life - 1);
  }

  return(
    <Theme>
      <Button className={styles.lifeCounter} radius="large" color="gray" onClick={decrementLife}>
        <span className={styles.lifeCounter__content}>
          <span className={styles.lifeCounter__icon}>
            <span className={styles.lifeCounter__icon__img}>
              <Image
                src="/img/img-prisoner.png"
                alt="prisoner"

                width={100}
                height={100}
              />              
            </span>
            <span className={styles.lifeCounter__icon__num}>
              <span className={styles.lifeCounter__life__content__txt__inline}>{numOfPlayer}</span>
            </span>
          </span>
          <span className={styles.lifeCounter__life}>
            <span className={styles.lifeCounter__life__content}>
              <HeartFilledIcon color="red"/>
              <Cross2Icon/>
              <span className={styles.lifeCounter__life__content__txt}>{life}</span>
            </span>
          </span>
        </span>
      </Button>
    </Theme>
  );
}

export default LifeCounter;