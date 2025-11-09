import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AsCardHome } from '../as-card-home/as-card-home';
import { ITEMS_CARDHOME } from '../../data/items-card-home.data';
import { ItemsCardHome } from '../../models/items-card-home';

@Component({
  selector: 'as-home',
  imports: [MatCardModule, AsCardHome],
  templateUrl: './home.html',
})
export class AsHome {
  public readonly itemsCardHome: readonly ItemsCardHome[] = ITEMS_CARDHOME;
}
