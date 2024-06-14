import React, {Fragment} from "react";
import styles from "./nome-jogo.module.css";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

type Props = {
    isGameStarted: any;
    setPlayerName: any;
    playerName: any;
    onClickStart: () => void;
}

const NomeJogo = ({isGameStarted, playerName, setPlayerName, onClickStart}: Props) => {
    return (
        <Fragment>
            <div className={styles.containerIcon}>
                <VideogameAssetIcon className={styles.icon}/>
                <div className={styles.title}>Mini Game</div>
                <VideogameAssetIcon className={styles.icon}/>
            </div>
            {!isGameStarted && (
                <div>
                    <div className={styles.inputIcon}>
                        <AccountCircleIcon className={styles.icon}/>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Digite seu nome"
                            className={`${styles.input} ${playerName.length > 0 ? styles.nameInputAnimation : ''}`}
                        />
                    </div>
                    <div className={styles.buttonMiniGame}>
                        <div className={styles.button} onClick={onClickStart}>
                            <PlayCircleOutlineIcon className={styles.iconPlay}/>
                          <div className={styles.textButton}>
                              Começar jogo
                          </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default NomeJogo