import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'ptgr-my-plants',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DatePipe, NgClass],
  templateUrl: './my-plants.component.html',
  styleUrl: './my-plants.component.scss'
})
export class MyPlantsComponent {

  plantForm: FormGroup;

  name: FormControl;
  variety: FormControl;
  monthBeforeHarvesting: FormControl;
  plantingDate: FormControl;
  fertilizationDate: FormControl;

  estimatedHarvestingDate = signal(null);

  now = computed(() => {
    let today = new Date();
    let dd: number | string = today.getDate();
    let mm: number | string = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    return yyyy + '-' + mm + '-' + dd;
  });


  constructor() {

    this.name = new FormControl('',[Validators.required]);
    this.variety = new FormControl('',[Validators.pattern('^[a-zA-Z]{0,}$') ]);
    this.monthBeforeHarvesting = new FormControl('',[Validators.required ]);
    this.plantingDate = new FormControl('',[Validators.required ]);
    this.fertilizationDate = new FormControl('',[]);

    this.plantForm = new FormGroup({
      name : this.name,
      variety : this.variety,
      monthBeforeHarvesting: this.monthBeforeHarvesting,
      plantingDate: this.plantingDate,
      fertilizationDate: this.fertilizationDate
    })
  }

}
