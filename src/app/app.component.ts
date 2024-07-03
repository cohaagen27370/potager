import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent,AlmanachComponent  } from './shared/components';
import { SizeService } from './shared/services/size.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AlmanachComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'potager';

  format = signal<string | undefined>('desktop');

  /**
   *
   */
  constructor(resizeService : SizeService) {

    resizeService.resize.subscribe((size) => {
      console.info(size);
      this.format.set(size);
    });

  }

}
