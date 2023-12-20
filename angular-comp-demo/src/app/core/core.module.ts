// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Layout Directives
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
// Services
import {
	ContentAnimateDirective,
	FirstLetterPipe,
	GetObjectPipe,
	HeaderDirective,
	JoinPipe,
	MenuDirective,
	OffcanvasDirective,
	SafePipe,
	ScrollTopDirective,
	StickyDirective,
	TabClickEventDirective,
	TimeElapsedPipe,
	ToggleDirective,
	DigitOnlyNumberDirective,
	TwoDecimaNumberDirective
} from './_base/layout';

@NgModule({
	imports: [CommonModule],
	declarations: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		ContentAnimateDirective,
		StickyDirective,
		DigitOnlyNumberDirective,
		TwoDecimaNumberDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
		FirstLetterPipe
	],
	exports: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		ContentAnimateDirective,
		StickyDirective,
		DigitOnlyNumberDirective,
		TwoDecimaNumberDirective,
		NgxUpperCaseDirectiveModule,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
		FirstLetterPipe
	],
	providers: []
})
export class CoreModule {
}
