import React, {Fragment} from "react";
import styles from "./mensagem-erro-sucesso.module.css";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type Props = {
    isGameOver: any
    isGameStarted: any
    currentIndex: any
    sequence: any
    onClickRestartGame: () => void
}

const MensagemErroSucesso = ({isGameOver, isGameStarted, currentIndex, sequence, onClickRestartGame}: Props) => {
    return (
        <Fragment>
            <div>
                {isGameOver && !isGameStarted && (
                    <div>
                        <div
                            className={`${styles.message} ${currentIndex === sequence.length ? styles.success : styles.error}`}>
                            {currentIndex === sequence.length ? (
                                <div className={styles.containerIcon}>
                                    <CheckCircleOutlineIcon className={styles.iconSuccess}/> Sucesso! <CheckCircleOutlineIcon className={styles.iconSuccess}/>
                                </div>
                            ) : (
                                <div className={styles.containerIcon}>
                                    <ErrorOutlineIcon className={styles.iconError}/> Você falhou! <ErrorOutlineIcon className={styles.iconError}/>
                                </div>
                            )}
                            <div className={styles.buttonMiniGame}>
                                <div className={styles.button} onClick={onClickRestartGame}>
                                    <RestartAltIcon className={styles.icon}/>
                                    <div className={styles.textButton}>
                                        Reiniciar jogo
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default MensagemErroSucesso