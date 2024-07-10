import { Component, inject } from '@angular/core';
import { SizeService } from '../../../shared/services';
import { MyPreparationsDesktopComponent } from '../my-preparations-desktop/my-preparations-desktop.component';
import { MyPreparationsMobileComponent } from '../my-preparations-mobile/my-preparations-mobile.component';

@Component({
  selector: 'ptgr-my-preparations-general',
  standalone: true,
  imports: [MyPreparationsDesktopComponent, MyPreparationsMobileComponent],
  templateUrl: './my-preparations-general.component.html',
  styleUrl: './my-preparations-general.component.scss'
})
export class MyPreparationsGeneralComponent {

  resizeService = inject(SizeService);

}
