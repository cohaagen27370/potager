import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { v4 as uuidv4 } from 'uuid';
import { DataService } from "../../shared/services/data.service";
import { inject } from "@angular/core";
import { add, sub, format, compareAsc } from 'date-fns';
import { Preparation } from "./my-preparations.model";
import { take } from "rxjs";

export interface StatePreparation {
  preparations: Array<Preparation>;
  loading: boolean;
}

export const StatePreparationInitial: StatePreparation = {
  preparations: [],
  loading: false
};

export const preparationStore = signalStore(
  withState(StatePreparationInitial),
  withMethods(
    (
      store
    ) => ({
      DetectAlert() {
        const preparationsWithAlerts = store.preparations().map(preparation =>  {
          preparation.harvestingAlert = compareAsc(add(new Date(), { weeks: 1}), preparation.harvestingDate! ) == 1;
          return preparation;
        });
        patchState(store, {preparations : preparationsWithAlerts});
      }
    })
  ),
  withMethods(
    (
      store,
      dataService = inject(DataService)
    ) => ({
      SaveANewPreparation(newPreparation: Preparation) {
        newPreparation.id = uuidv4();
        patchState(store,{ preparations : [...store.preparations(), newPreparation]});
        store.DetectAlert();
        dataService.saveNew("my-preparations", newPreparation).subscribe({
          next(value) {
            console.info(value);
          },
          error(err) {
            console.error(err);
          },
        });
      },
      UpdatePreparation(existingPreparation: Preparation) {
        patchState(store, {
          preparations: store
            .preparations()
            .map((preparation) =>
              preparation.id === existingPreparation.id
                ? { ...preparation, name : existingPreparation.name, type : existingPreparation.type, makingDate : existingPreparation.makingDate, harvestingDate : existingPreparation.harvestingDate, daysBeforeHarvesting : existingPreparation.daysBeforeHarvesting  }
                : preparation,
            ) as Array<Preparation>
        });
        store.DetectAlert();

        dataService.update("my-preparations",existingPreparation.id, existingPreparation).subscribe({
          next(value) {
            console.info(value);
          },
          error(err) {
            console.error(err);
          },
        });
      },
      RemovePreparation(id: string) {
        patchState(store, {preparations : store.preparations().filter(x => x.id != id)});
        dataService.remove("my-preparations", id).subscribe({
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

      dataService.getAll<Preparation>("my-preparations").pipe(take(1)).subscribe({
        next(value) {
          patchState(store, { preparations : value});
          store.DetectAlert();
        },
      });

    },
    onDestroy(store) {
      console.log('count on destroy');
    },
  }),
);
