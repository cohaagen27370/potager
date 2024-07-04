import { Component, OnInit, inject, signal } from '@angular/core';
import { SizeService } from '../../../shared/services/size.service';
import { MyPlantsDesktopComponent } from '../my-plants-desktop/my-plants-desktop.component';
import { MyPlantsMobileComponent } from '../my-plants-mobile/my-plants-mobile.component';

@Component({
  selector: 'ptgr-my-plants-general',
  standalone: true,
  imports: [MyPlantsDesktopComponent, MyPlantsMobileComponent],
  templateUrl: './my-plants-general.component.html',
  styleUrl: './my-plants-general.component.scss'
})
export class MyPlantsGeneralComponent {

  resizeService = inject(SizeService);

}
