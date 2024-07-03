import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent,AlmanachComponent  } from './shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AlmanachComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'potager';
}
