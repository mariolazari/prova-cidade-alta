import React, {Fragment, useEffect, useState} from "react";
import styles from "./tabela.module.css";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

type Props = {
    players: any,
    formatTime: any,
    onClickRestartGame: () => void
}

const Tabela = ({players, formatTime, onClickRestartGame}: Props) => {
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightedIndex((prevIndex) => (prevIndex + 1) % players.length);
        }, 1000);

        return () => clearInterval(interval);
    }, [players]);

    return (
        <Fragment>
            <div className={styles.containerPlacar}>
                <div className={styles.containerIcon}>
                    <EmojiEventsIcon className={styles.icon}/>
                    <div className={styles.titlePlacar}>Ranking dos Jogadores</div>
                    <EmojiEventsIcon className={styles.icon}/>
                </div>
                <div className={styles.scrollContainer}>
                    <div className={styles.containerTabela}>
                        <div className={styles.textTabela}>
                            Posição
                        </div>
                        <div className={styles.textTabela}>
                            Nome
                        </div>
                        <div className={styles.textTabela}>
                            Acertos
                        </div>
                        <div className={styles.textTabela}>
                            Tempo
                        </div>
                    </div>
                    {players.slice(0, 10).map((player: any, index: number) => (
                        <div key={index}
                             className={`${styles.textContainerPlacar} ${highlightedIndex === index ? styles.highlighted : ''}`}>
                            <div className={styles.textPlacar}>
                                {index + 1}.
                            </div>
                            <div className={styles.textPlacar}>
                                {player.name}
                            </div>
                            <div className={styles.textPlacar}>
                                {player.score}
                            </div>
                            <div className={styles.textPlacar}>
                                {formatTime(player.timeTaken)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.containerButtonGame}>
                    <div className={styles.buttonGame} onClick={onClickRestartGame}>
                        <RestartAltIcon className={styles.iconResetar}/>
                        <div className={styles.textButton}>
                            Resetar Tabela
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Tabela;
