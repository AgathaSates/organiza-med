import { I } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ItensCardInicio } from '../../models/itens-card-inicio';

@Component({
  selector: 'as-card-inicio',
  imports: [MatCardModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './as-card-inicio.html',
})
export class AsCardInicio {
  @Input({ required: true }) ItemCardInicio!: ItensCardInicio;
}
