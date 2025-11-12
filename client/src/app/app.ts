import { Component, inject } from '@angular/core';
import { AsShell } from './components/shared/shell/shell.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './components/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [AsShell, RouterOutlet, AsyncPipe],
  templateUrl: './app.html',
})
export class App {
  protected readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  protected readonly accessToken$ = this.authService.accessToken$;

  public logout() {
    const sairObserver: PartialObserver<null> = {
      complete: () => this.router.navigate(['/auth/login']),
    };

    this.authService.sair().subscribe(sairObserver);
  }
}
