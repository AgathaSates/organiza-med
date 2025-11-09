import { I } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ItemsCardHome } from '../../models/items-card-home';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'as-card-home',
  imports: [MatCardModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './as-card-home.html',
})
export class AsCardHome {
  @Input({ required: true }) ItemCardHome!: ItemsCardHome;
}
