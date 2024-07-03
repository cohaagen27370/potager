import { Component, inject } from '@angular/core';
import { CoreStore } from '../../core';
import { NgClass } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'ptgr-header',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  coreStore = inject(CoreStore);
  router = inject(Router);

  navigate(page:string) {
    this.coreStore.changePage(page);
    this.router.navigate([page]);
  }

}
