import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { v4 as uuidv4 } from 'uuid';
import { DataService } from "../../shared/services/data.service";
import { inject } from "@angular/core";
import { add, sub, format, compareAsc } from 'date-fns';
import { take } from "rxjs";
import { Stocks } from "./stocks.model";

export interface StateStocks {
  stocks: Array<Stocks>;
  loading: boolean;
}

export const StateStocksInitial: StateStocks = {
  stocks: [],
  loading: false
};

export const stockStore = signalStore(
  withState(StateStocksInitial),
  withMethods(
    (
      store
    ) => ({
      DetectAlert() {
        const stocksWithAlerts = store.stocks().map(stock =>  {
          stock.expirationAlert = compareAsc(add(new Date(), { weeks: 1}), stock.expirationDate! ) == 1;
          return stock;
        });
        patchState(store, {stocks : stocksWithAlerts});
      }
    })
  ),
  withMethods(
    (
      store,
      dataService = inject(DataService)
    ) => ({
      SaveANewStock(newStock: Stocks) {
        newStock.id = uuidv4();
        patchState(store,{ stocks : [...store.stocks(), newStock]});
        store.DetectAlert();
        dataService.saveNew("my-stocks", newStock).subscribe({
          next(value) {
            console.info(value);
          },
          error(err) {
            console.error(err);
          },
        });
      },
      UpdateStock(existingStock: Stocks) {
        patchState(store, {
          stocks: store
            .stocks()
            .map((stock) =>
              stock.id === existingStock.id
                ? { ...stock, name : existingStock.name, variety : existingStock.variety, amount : existingStock.amount, expirationDateDate : existingStock.expirationDate, photoLink : existingStock.photoLink }
                : stock,
            ) as Array<Stocks>
        });
        store.DetectAlert();

        dataService.update("my-stocks",existingStock.id, existingStock).subscribe({
          next(value) {
            console.info(value);
          },
          error(err) {
            console.error(err);
          },
        });
      },
      RemoveStock(id: string) {
        patchState(store, {stocks : store.stocks().filter(x => x.id != id)});
        dataService.remove("my-stocks", id).subscribe({
          next(value) {
            console.info(value);
          },
          error(err) {
            console.error(err);
          },
        });
      }
    })
  ),
  withHooks({
    async onInit(store, dataService = inject(DataService)) {

      dataService.getAll<Stocks>("my-stocks").pipe(take(1)).subscribe({
        next(value) {
          patchState(store, { stocks : value});
          store.DetectAlert();
        },
      });

    },
    onDestroy(store) {
      console.log('count on destroy');
    },
  }),
);
