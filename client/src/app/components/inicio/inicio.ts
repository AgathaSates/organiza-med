import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ITENS_CARD_INICIO } from '../../data/items-card-home.data';
import { ItensCardInicio } from '../../models/itens-card-inicio';
import { AsCardInicio } from '../as-card-inicio/as-card-inicio';

@Component({
  selector: 'as-inicio',
  imports: [MatCardModule, AsCardInicio],
  templateUrl: './inicio.html',
})
export class AsInicio {
  public readonly itensCardInicio: readonly ItensCardInicio[] = ITENS_CARD_INICIO;
}
