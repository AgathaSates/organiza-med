import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  defer,
  distinctUntilChanged,
  merge,
  Observable,
  of,
  shareReplay,
  skip,
  tap,
} from 'rxjs';
import { AccessTokenModel, LoginModel, RegistrarModel } from './auth.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/api/auth';
  private readonly chaveAccessToken: string = 'organiza-med:access-token';

  public readonly accessTokenSubject$ = new BehaviorSubject<AccessTokenModel | undefined>(
    undefined,
  );

  public readonly accessTokenArmazenado$ = defer(() => {
    const accessToken = this.obterAccessToken();

    if (!accessToken) return of(undefined);

    const {
      dados: { dataExpiracao },
    } = accessToken;
    const valido = new Date(dataExpiracao) > new Date();

    if (!valido) return of(undefined);

    return of(accessToken);
  });

  public readonly accessToken$ = merge(
    this.accessTokenArmazenado$,
    this.accessTokenSubject$.pipe(skip(1)),
  ).pipe(
    distinctUntilChanged((a, b) => a === b),
    tap((accessToken) => {
      if (accessToken) this.salvarAccessToken(accessToken);
      else this.limparAccessToken();

      this.accessTokenSubject$.next(accessToken);
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public registro(registroModel: RegistrarModel): Observable<AccessTokenModel> {
    const urlCompleto = `${this.apiUrl}/registrar`;

    return this.http
      .post<AccessTokenModel>(urlCompleto, registroModel)
      .pipe(tap((token) => this.accessTokenSubject$.next(token)));
  }

  public login(loginModel: LoginModel): Observable<AccessTokenModel> {
    const urlCompleto = `${this.apiUrl}/autenticar`;

    return this.http
      .post<AccessTokenModel>(urlCompleto, loginModel)
      .pipe(tap((token) => this.accessTokenSubject$.next(token)));
  }

  public sair(): Observable<null> {
    const urlCompleto = `${this.apiUrl}/sair`;

    return this.http
      .post<null>(urlCompleto, {})
      .pipe(tap(() => this.accessTokenSubject$.next(undefined)));
  }

  private salvarAccessToken(token: AccessTokenModel): void {
    const jsonString = JSON.stringify(token);

    localStorage.setItem(this.chaveAccessToken, jsonString);
  }

  private limparAccessToken(): void {
    localStorage.removeItem(this.chaveAccessToken);
  }

  private obterAccessToken(): AccessTokenModel | undefined {
    const jsonString = localStorage.getItem(this.chaveAccessToken);

    if (!jsonString) return undefined;

    return JSON.parse(jsonString);
  }
}
