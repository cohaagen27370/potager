import { Component, inject, signal } from '@angular/core';
import { stockStore } from './stocks.store';
import { DatePipe, NgClass } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AllVegetables, Vegetables } from '../../shared/params';
import { Stocks } from './stocks.model';
import { AmountPipe } from '../../shared/pipes/amount.pipe';

@Component({
  selector: 'ptgr-stocks',
  standalone: true,
  imports: [NgClass, DatePipe, ReactiveFormsModule, FormsModule, AmountPipe],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss',
  providers : [stockStore]
})
export class StocksComponent {

  stockStore = inject(stockStore);

  stockForm: FormGroup;

  id: FormControl;
  name: FormControl;
  variety: FormControl;
  amount: FormControl;
  expirationDate: FormControl;
  photoLink: FormControl;

  vegetables: Vegetables[] = AllVegetables;

  varieties = signal<Array<string>| undefined>([]);

  Submit() {
    let newStock = this.stockForm.value as Stocks;

    if (newStock.id)
    {
      this.stockStore.UpdateStock(newStock);
    }
    else
    {
      this.stockStore.SaveANewStock(newStock);
    }

    this.stockForm.reset();
  }

  modify(stock: Stocks) {
    this.stockForm.setValue(stock);
  }

  remove({id}: Stocks) {
    this.stockStore.RemoveStock(id);
  }

  constructor() {

    this.id = new FormControl(undefined,[]);
    this.name = new FormControl('',[Validators.required]);
    this.variety = new FormControl('',[Validators.required]);
    this.amount = new FormControl('',[Validators.required ]);
    this.expirationDate = new FormControl('',[Validators.required ]);
    this.photoLink = new FormControl(undefined,[]);

    this.stockForm = new FormGroup({
      id: this.id,
      name : this.name,
      variety : this.variety,
      amount: this.amount,
      expirationDate: this.expirationDate,
      photoLink: this.photoLink
    });

    this.name.events.subscribe(() => {
      this.varieties.set(this.vegetables.find(x => x.name == this.name.value)?.varieties);
    });

  }

}
