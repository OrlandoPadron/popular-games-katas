import { Injectable } from '@angular/core';
import wordsJson from '../../assets/json/hangman/hangman-words.json';

@Injectable({
	providedIn: 'root',
})
export class HangmanService {
	protected readonly MAX_ATTEMPTS = 9;
	protected currentAttempt = 1;
	protected selectedWord!: { word: string; hint: string };
	protected correctLetters!: string[];
	protected wrongLetters: string[] = [];

	constructor() {
		this.selectedWord = this.selectRandomWord();
		this.correctLetters = Array(this.selectedWord.word.length).fill('');
	}

	addLetter(letter: string): void {
		if (this.isGameOver()) return;
		const upperCaseLetter = letter.toUpperCase();
		if (this.isLetterAlreadyUse(upperCaseLetter)) return;

		const letterIsCorrect = this.getLettersOfSelectedWord().includes(upperCaseLetter);
		if (!letterIsCorrect) {
			this.wrongLetters.push(upperCaseLetter);
			this.currentAttempt += 1;
			return;
		}
		this.getLettersOfSelectedWord().forEach((wordLetter: string, index: number) => {
			if (upperCaseLetter === wordLetter) {
				this.correctLetters[index] = upperCaseLetter;
			}
		});
	}

	getLettersOfSelectedWord(): string[] {
		return this.selectedWord.word.toUpperCase().split('');
	}

	getLettersUsed(): string[] {
		return [...this.correctLetters, ...this.wrongLetters];
	}

	getCorrectLetters(): string[] {
		return this.correctLetters;
	}

	isGameOver(): boolean {
		return this.MAX_ATTEMPTS === this.currentAttempt || this.correctLetters.every(value => value.length);
	}

	getCurrentAttempt(): number {
		return this.currentAttempt;
	}

	getWrongLetters(): string[] {
		return this.wrongLetters;
	}

	getHint(): string {
		return this.selectedWord.hint;
	}

	private isLetterAlreadyUse(letter: string): boolean {
		return this.getLettersUsed().includes(letter.toUpperCase());
	}

	private selectRandomWord(): { word: string; hint: string } {
		const randomIndex = Math.floor(Math.random() * wordsJson.length);
		return wordsJson[randomIndex];
	}
}
