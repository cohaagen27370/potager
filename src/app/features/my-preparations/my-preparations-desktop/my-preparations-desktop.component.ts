import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { add, format } from 'date-fns';
import { DatePipe, NgClass } from '@angular/common';
import { preparationStore } from '../my-preparations.store';
import { AllPreparations, preparations } from '../../../shared/params';
import { Preparation } from '../my-preparations.model';

@Component({
  selector: 'ptgr-my-preparations-desktop',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DatePipe, NgClass],
  templateUrl: './my-preparations-desktop.component.html',
  styleUrl: './my-preparations-desktop.component.scss',
  providers : [preparationStore]
})
export class MyPreparationsDesktopComponent {

  preparationStore = inject(preparationStore);

  preparations: preparations[] = AllPreparations;

  preparationForm: FormGroup;

  id: FormControl;
  name: FormControl;
  type: FormControl;
  daysBeforeHarvesting: FormControl;
  makingDate: FormControl;
  harvestingDate: FormControl;

  types = signal<Array<string>| undefined>([]);


  Submit() {
    let newPreparation = this.preparationForm.value as Preparation;

    if (newPreparation.id)
    {
      this.preparationStore.UpdatePreparation(newPreparation);
    }
    else
    {
      this.preparationStore.SaveANewPreparation(newPreparation);
    }

    this.preparationForm.reset();
  }

  modify(preparation: Preparation) {
    this.preparationForm.setValue(preparation);
  }

  remove({id}: Preparation) {
    this.preparationStore.RemovePreparation(id);
  }


  constructor() {

    this.id = new FormControl(undefined,[]);
    this.name = new FormControl('',[Validators.required]);
    this.type = new FormControl('',[Validators.required]);
    this.daysBeforeHarvesting = new FormControl('',[Validators.required ]);
    this.makingDate = new FormControl('',[Validators.required ]);
    this.harvestingDate = new FormControl({ value :'',  disabled: true},[]);

    this.preparationForm = new FormGroup({
      id: this.id,
      name : this.name,
      type : this.type,
      daysBeforeHarvesting: this.daysBeforeHarvesting,
      makingDate: this.makingDate,
      harvestingDate : this.harvestingDate
    });

    this.name.events.subscribe(() => {
      this.types.set(this.preparations.find(x => x.name == this.name.value)?.type);
    });

    this.daysBeforeHarvesting.events.subscribe(() => {
      if (this.makingDate.valid)
        this.harvestingDate.setValue(format(add(this.makingDate.value, { days : this.daysBeforeHarvesting.value}),'yyyy-MM-dd'));
    });
    this.makingDate.events.subscribe(() => {
      if (this.daysBeforeHarvesting.valid)
        this.harvestingDate.setValue(format(add(this.makingDate.value, { days : this.daysBeforeHarvesting.value}),'yyyy-MM-dd'));
    });

  }

}
