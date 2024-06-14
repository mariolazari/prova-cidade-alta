import React, {Fragment, useEffect, useState} from 'react';
import styles from './miniGame.module.css';
import Tabela from '../tabela';
import MensagemErroSucesso from "../mensagem-erro-sucesso";
import Jogo from "../jogo";
import NomeJogo from "../nome-jogo";
import Footer from "../footer";
import Social from "../social";

const generateRandomSequence = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const MiniGame = () => {
    const [playerName, setPlayerName] = useState('');
    const [sequence, setSequence] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState(0);
    const [players, setPlayers] = useState([]);
    const [startTime, setStartTime] = useState<Date | null>(null);

    useEffect(() => {
        const savedPlayers = localStorage.getItem('players');
        if (savedPlayers) {
            setPlayers(JSON.parse(savedPlayers));
        }
    }, [feedback]);

    useEffect(() => {
        if (isGameStarted) {
            const newSequence = generateRandomSequence(6);
            setSequence(newSequence);
            setCurrentIndex(0);
            setTimeLeft(10);
            setIsGameOver(false);
            setFeedback('');
            setStartTime(new Date());
        }
    }, [isGameStarted]);

    useEffect(() => {
        if (isGameStarted && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            handleGameOver();
        }
    }, [timeLeft, isGameStarted]);

    const handleKeyPress = (event: any) => {
        if (!isGameStarted || isGameOver) return;

        const keyPressed = event.key.toUpperCase();
        const currentLetter = sequence[currentIndex];

        if (currentLetter && keyPressed === currentLetter) {
            setFeedback('correct');
            setTimeout(() => setFeedback(''), 200);
            setCurrentIndex(currentIndex + 1);
            if (currentIndex + 1 === sequence.length) {
                setScore(score + 1);
                const newSequence = generateRandomSequence(6);
                setSequence(newSequence);
                setCurrentIndex(0);
                setTimeLeft(10);
            }
        } else {
            setFeedback('incorrect');
            setTimeout(() => setFeedback(''), 200);
            handleGameOver();
        }
    };

    const updatePlayerScore = (name: string, newScore: number, timeTaken: number) => {
        let updatedPlayers: any = [...players];
        const playerIndex = updatedPlayers.findIndex((player: { name: string; }) => player.name === name);

        if (playerIndex !== -1) {
            updatedPlayers[playerIndex].score += newScore;
            updatedPlayers[playerIndex].timeTaken = timeTaken;
        } else {
            updatedPlayers.push({name, score: newScore, timeTaken});
        }

        updatedPlayers.sort((a: any, b: any) => b.score - a.score || a.timeTaken - b.timeTaken);

        setPlayers(updatedPlayers);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    };

    const handleGameOver = () => {
        setIsGameOver(true);
        setIsGameStarted(false);
        const endTime = new Date();
        const timeTaken = Math.round((endTime.getTime() - (startTime?.getTime() || 0)) / 1000);
        updatePlayerScore(playerName, score, timeTaken);
    };

    const handlerInstagram = () => {
        window.open("https://www.instagram.com/lazari.mario/", "_blank");
    }

    const hadlerLinkdIn = () => {
        window.open("https://www.linkedin.com/in/mario-lazari-3b71a51bb/", "_blank");
    }

    const handlerEmail = () => {
        window.open("https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHxGsVKXmGwBPXBvXZcjWwdbjSwsQMBMcHtxKWBQhnVJRFnCVnXhfLdKNlWkMWDQFxctmXv")
    }

    const startGame = () => {
        if (playerName.trim() === '') {
            alert('Por favor, insira seu nome para começar.');
            return;
        }
        setIsGameStarted(true);
        setScore(0);
        setStartTime(new Date());
    };

    const restartGame = () => {
        setIsGameStarted(false);
        setIsGameOver(false);
        setScore(0);
        setSequence('');
        setCurrentIndex(0);
        setTimeLeft(10);
    };

    const resetPlayers = () => {
        setPlayers([]);
        localStorage.removeItem('players');
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentIndex, isGameStarted, isGameOver]);

    return (
        <Fragment>
            <div className={styles.gameContainer}>
                <div className={styles.containerMiniGame}>
                    <NomeJogo
                        isGameStarted={isGameStarted}
                        setPlayerName={setPlayerName}
                        playerName={playerName}
                        onClickStart={startGame}
                    />
                    <Jogo
                        isGameStarted={isGameStarted}
                        sequence={sequence}
                        currentIndex={currentIndex}
                        timeLeft={timeLeft}
                        onClickRestartGame={restartGame}
                    />
                    <MensagemErroSucesso
                        isGameOver={isGameOver}
                        isGameStarted={isGameStarted}
                        currentIndex={currentIndex}
                        sequence={sequence}
                        onClickRestartGame={restartGame}
                    />
                </div>
                <Tabela
                    players={players}
                    formatTime={formatTime}
                    onClickRestartGame={resetPlayers}
                />
                <Footer/>
                <Social
                    onClickInstagram={handlerInstagram}
                    onClickLinkdIn={hadlerLinkdIn}
                    onClickEmail={handlerEmail}
                />
            </div>
        </Fragment>
    );
};

export default MiniGame;
