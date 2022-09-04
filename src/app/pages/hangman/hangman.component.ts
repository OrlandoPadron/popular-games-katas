import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-hangman',
	templateUrl: './hangman.component.html',
	styleUrls: ['./hangman.component.scss'],
})
export class HangmanComponent implements OnInit {
	selectedWord = 'PERRO';
	currentAttempt = 1;
	numMaxOfAttempts = 9;
	correctLetters!: string[];
	wrongLetters: string[] = [];

	inputController = new FormControl('', [
		Validators.required,
		Validators.pattern('[A-z]{1}'),
		Validators.maxLength(1),
	]);

	constructor() {}

	ngOnInit(): void {
		this.correctLetters = Array(this.selectedWord.length).fill('');
	}

	onSubmit(): void {
		if (this.inputController.invalid) return;
		const letter = (this.inputController.value as string).toUpperCase();

		const letterAlreadyUsed = this.getLettersUsed().includes(letter);
		if (letterAlreadyUsed) return;

		const letterIsCorrect = this.lettersOfSelectedWord.includes(letter);
		if (!letterIsCorrect) {
			this.wrongLetters.push(letter);
			this.currentAttempt += 1;
			return;
		}
		this.lettersOfSelectedWord.forEach((wordLetter: string, index: number) => {
			if (letter === wordLetter) {
				this.correctLetters[index] = letter;
			}
		});
	}

	get lettersOfSelectedWord(): string[] {
		return this.selectedWord.split('');
	}

	getLettersUsed(): string[] {
		return [...this.correctLetters, ...this.wrongLetters];
	}

	getHangmanImage(): string {
		return `assets/images/hangman/hangman-attempt-${this.currentAttempt}.svg`;
	}

	isGameOver(): boolean {
		return this.numMaxOfAttempts === this.currentAttempt || this.correctLetters.every(value => value.length);
	}
}
