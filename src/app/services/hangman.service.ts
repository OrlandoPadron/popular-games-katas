import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class HangmanService {
	protected readonly MAX_ATTEMPTS = 9;
	protected currentAttempt = 1;
	protected selectedWord!: string;
	protected correctLetters!: string[];
	protected wrongLetters: string[] = [];

	constructor() {
		this.selectedWord = 'PERRO'.toUpperCase();
		this.correctLetters = Array(this.selectedWord.length).fill('');
	}

	addLetter(letter: string): void {
		if (this.isGameOver()) return;
		if (this.isLetterAlreadyUse(letter)) return;

		const letterIsCorrect = this.getLettersOfSelectedWord().includes(letter);
		if (!letterIsCorrect) {
			this.wrongLetters.push(letter);
			this.currentAttempt += 1;
			return;
		}
		this.getLettersOfSelectedWord().forEach((wordLetter: string, index: number) => {
			if (letter === wordLetter) {
				this.correctLetters[index] = letter;
			}
		});
	}

	private isLetterAlreadyUse(letter: string): boolean {
		return this.getLettersUsed().includes(letter.toUpperCase());
	}

	getLettersOfSelectedWord(): string[] {
		return this.selectedWord.split('');
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
}
