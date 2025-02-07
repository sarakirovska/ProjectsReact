import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "./languages"
import { getFarewellText, getRandomWord } from "./utils"
/**
 * Goal: Allow the user to start guessing the letters
 *
 * Challenge: Only display the correctly-guessed letters
 * in the word
 */

export default function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = useState(()=>getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])

    const wrongGameCount= guessedLetters.filter(letter=>!currentWord.includes(letter)).length
    const isGameWon=
        currentWord.split("").every(letter=>guessedLetters.includes(letter))
    const isGameLost=wrongGameCount>=languages.length - 1
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter=guessedLetters[guessedLetters.length-1]
    const isLastGuessIncorrect=lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    function startNewGame(){
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
    }


    const languageElements = languages.map((lang,index) => {
        const isLanguageLost=index < wrongGameCount
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className=clsx("chip",isLanguageLost &&"lost")
        return (
            <span
                className={className}
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const letterElements = currentWord.split("").map((letter, index) => {
        const shouldRevealLetter=isGameLost || guessedLetters.includes(letter)
        const letterClassName=clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
            )
            return(
        <span key={index} className={letterClassName}>

            {shouldRevealLetter ? letter.toUpperCase() : ""}
        </span>
    )
    })

    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong

        })



        return (
            <button
                className={className}
                key={letter}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    const gameStatusClass=clsx("game-status",{
        won:isGameWon,
        lost:isGameLost
    })
    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p className="firewell-message">
                    {getFarewellText(languages[wrongGameCount-1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } else {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
        return null
    }

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                    programming world safe from Assembly!</p>
            </header>
            <section className={gameStatusClass}>
                {renderGameStatus()}
            </section>

            <section className="language-chips">
                {languageElements}
            </section>
            <section className="word">
                {letterElements}
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            {isGameOver&& <button className="new-game" onClick={startNewGame}>New Game</button>}
        </main>
    )
}