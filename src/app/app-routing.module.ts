import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from './pages/hangman/hangman.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'hangman-game',
		pathMatch: 'full',
	},
	{
		path: 'hangman-game',
		component: HangmanComponent,
	},
	{ path: '**', redirectTo: 'hangman-game', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
