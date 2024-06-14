import React, { Fragment } from "react";
import styles from "./jogo.module.css";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

type Props = {
    isGameStarted: boolean;
    sequence: string;
    currentIndex: number;
    timeLeft: number;
    onClickRestartGame: () => void;
};

const Jogo = ({ isGameStarted, sequence, currentIndex, timeLeft, onClickRestartGame }: Props) => {
    return (
        <Fragment>
            <div>
                {isGameStarted && (
                    <div>
                        <div className={styles.letterContainer}>
                            {sequence.split('').map((letter, index) => (
                                <div
                                    key={index}
                                    className={`${styles.letterBox} ${index < currentIndex ? styles.correct : ''} ${index === currentIndex ? styles.animated : ''}`}
                                >
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <div className={styles.progressBarContainerS}>
                            <div
                                className={styles.progressBarS}
                                style={{ width: `${(timeLeft / 10) * 100}%` }}
                            ></div>
                        </div>
                        <div className={styles.containerButtonGame}>
                            <div className={styles.buttonGame} onClick={onClickRestartGame}>
                                <RestartAltIcon className={styles.icon} />
                                <div className={styles.textButton}>
                                    Reiniciar jogo
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Jogo;
