import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HangmanService } from '../../services/hangman.service';

@Component({
	selector: 'app-hangman',
	templateUrl: './hangman.component.html',
	styleUrls: ['./hangman.component.scss'],
})
export class HangmanComponent implements OnInit {
	@ViewChild('input') input!: ElementRef<HTMLInputElement>;
	inputController = new FormControl('', [
		Validators.required,
		Validators.pattern('[A-z]{1}'),
		Validators.maxLength(1),
	]);

	constructor(private hangmanService: HangmanService, private renderer: Renderer2) {}

	ngOnInit(): void {}

	onSubmit(): void {
		if (this.inputController.invalid) return;
		const letter = (this.inputController.value as string).toUpperCase();
		this.hangmanService.addLetter(letter);
		this.inputController.setValue('');
		this.input.nativeElement.focus();
	}

	get correctLetters(): string[] {
		return this.hangmanService.getCorrectLetters();
	}

	get wrongLetters(): string[] {
		return this.hangmanService.getWrongLetters();
	}

	get lettersUsed(): string[] {
		return this.hangmanService.getLettersUsed();
	}

	get hangmanImage(): string {
		return `assets/images/hangman/hangman-attempt-${this.hangmanService.getCurrentAttempt()}.svg`;
	}

	get hint(): string {
		return this.hangmanService.getHint();
	}

	isGameOver(): boolean {
		return this.hangmanService.isGameOver();
	}
}
