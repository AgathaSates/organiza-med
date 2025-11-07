import { Component } from '@angular/core';
import { AsShell } from './components/shared/shell/shell.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [AsShell, RouterOutlet],
  templateUrl: './app.html',
})
export class App {}
