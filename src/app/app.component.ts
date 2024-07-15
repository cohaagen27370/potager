import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent,AlmanachComponent  } from './shared/components';
import { SizeService } from './shared/services/size.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AlmanachComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'potager';
  resizeService = inject(SizeService);

  showAlmanac:boolean = true;

  showOrHideAlmanac() {
    this.showAlmanac = !this.showAlmanac;

  }

}
