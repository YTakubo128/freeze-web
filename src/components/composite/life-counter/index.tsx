import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Theme, Box, Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { HeartFilledIcon, Cross2Icon } from "@radix-ui/react-icons";
import styles from "./styles.module.scss";

interface LifeCounterProps {
  numOfPlayer: number;
  onLifeDepleted?: () => void;
}

function LifeCounter({ numOfPlayer, onLifeDepleted }: LifeCounterProps) {
  const [life, setLife] = useState(3);
  const clickSound = new Audio("/sound/click.mp3");

  const decrementLife = () => {
    if(life > 0) {
      clickSound.play();
      setLife(life - 1);
    }
  };

  useEffect(() => {
    if(life === 0 && onLifeDepleted){
      onLifeDepleted();
    }
  }, [life, onLifeDepleted]);

  return(
    <Theme>
      <Button className={styles.lifeCounter} radius="large" color="gray" onClick={decrementLife}>
        {life > 0 ? (
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
          ) : (
            <Image
              src="/img/img-arrest.png"
              alt="out of play"
              width={80}
              height={80}
            />
          )}
      </Button>
    </Theme>
  );
}

export default LifeCounter;