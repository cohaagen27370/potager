import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AllVegetables, Vegetables } from '../../shared/params';
import { add, sub, format } from 'date-fns';
import { plantStore } from './my-plants.store';
import { Plant } from './my-plants.model';

@Component({
  selector: 'ptgr-my-plants',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DatePipe, NgClass],
  templateUrl: './my-plants.component.html',
  styleUrl: './my-plants.component.scss',
  providers : [plantStore]
})
export class MyPlantsComponent {

  plantStore = inject(plantStore);

  plantForm: FormGroup;

  id: FormControl;
  name: FormControl;
  variety: FormControl;
  monthBeforeHarvesting: FormControl;
  plantingDate: FormControl;
  fertilizationDate: FormControl;
  harvestingDate: FormControl;

  vegetables: Vegetables[] = AllVegetables;

  max = computed(() => {
    return format(add(new Date(), { days : 14}),'yyyy-MM-dd');
  });
  min = computed(() => {
    return format(sub(new Date(), { days : 14}),'yyyy-MM-dd');
  });

  varieties = signal<Array<string>| undefined>([]);

  Submit() {
    let newPlant = this.plantForm.value as Plant;

    if (newPlant.id)
    {
      this.plantStore.UpdatePlant(newPlant);
    }
    else
    {
      this.plantStore.SaveANewPlant(newPlant);
    }

    this.plantForm.reset();
  }

  modify(plant: Plant) {
    this.plantForm.setValue(plant);
  }

  remove({id}: Plant) {
    this.plantStore.RemovePlant(id);
  }

  constructor() {

    this.id = new FormControl(undefined,[]);
    this.name = new FormControl('',[Validators.required]);
    this.variety = new FormControl('',[Validators.required]);
    this.monthBeforeHarvesting = new FormControl('',[Validators.required ]);
    this.plantingDate = new FormControl('',[Validators.required ]);
    this.fertilizationDate = new FormControl(undefined,[]);
    this.harvestingDate = new FormControl('',[]);

    this.plantForm = new FormGroup({
      id: this.id,
      name : this.name,
      variety : this.variety,
      monthBeforeHarvesting: this.monthBeforeHarvesting,
      plantingDate: this.plantingDate,
      fertilizationDate: this.fertilizationDate,
      harvestingDate : this.harvestingDate
    });

    this.name.events.subscribe(() => {
      this.varieties.set(this.vegetables.find(x => x.name == this.name.value)?.varieties);
    });

    this.monthBeforeHarvesting.events.subscribe(() => {
      if (this.plantingDate.valid)
        this.harvestingDate.setValue(format(add(this.plantingDate.value, { months : this.monthBeforeHarvesting.value}),'yyyy-MM-dd'));
    });
    this.plantingDate.events.subscribe(() => {
      if (this.monthBeforeHarvesting.valid)
        this.harvestingDate.setValue(format(add(this.plantingDate.value, { months : this.monthBeforeHarvesting.value}),'yyyy-MM-dd'));
    });

  }

}
