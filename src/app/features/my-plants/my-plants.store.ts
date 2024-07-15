import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { Plant } from "./my-plants.model";
import {v4 as uuidv4} from 'uuid';
import { inject } from "@angular/core";
import { add, compareAsc } from 'date-fns';
import { DataService } from "../../shared/services";
import { take } from "rxjs";

export interface StatePlant {
  plants: Array<Plant>;
  loading: boolean;
}

export const StatePlantInitial: StatePlant = {
  plants: [],
  loading: false
};

export const plantStore = signalStore(
  withState(StatePlantInitial),
  withMethods(
    (
      store
    ) => ({
      DetectAlert() {
        const plantsWithAlerts = store.plants().map(plant =>  {
          if (plant.fertilizationDate)
            plant.fertilizationAlert = compareAsc(add(new Date(), { weeks: 2}), plant.fertilizationDate! ) == 1;
          plant.harvestingAlert = compareAsc(add(new Date(), { weeks: 1}), plant.harvestingDate! ) == 1;
          return plant;
        });
        patchState(store, {plants : plantsWithAlerts});
      }
    })
  ),
  withMethods(
    (
      store,
      dataService = inject(DataService)
    ) => ({
      SaveANewPlant(newPlant: Plant) {
        newPlant.id = uuidv4();
        patchState(store,{ plants : [...store.plants(), newPlant]});
        store.DetectAlert();
        dataService.saveNew("my-plants", newPlant).subscribe({
          next(value) {
            console.info(value);
          },
          error(err) {
            console.error(err);
          },
        });
      },
      UpdatePlant(existingPlant: Plant) {
        patchState(store, {
          plants: store
            .plants()
            .map((plant) =>
              plant.id === existingPlant.id
                ? { ...plant, name : existingPlant.name, variety : existingPlant.variety, plantingDate : existingPlant.plantingDate, fertilizationDate : existingPlant.fertilizationDate, harvestingDate : existingPlant.harvestingDate, monthBeforeHarvesting : existingPlant.monthBeforeHarvesting  }
                : plant,
            ) as Array<Plant>
        });
        store.DetectAlert();

        dataService.update<Plant>("my-plants", existingPlant.id, existingPlant);
      },
      RemovePlant(id: string) {
        patchState(store, {plants : store.plants().filter(x => x.id != id)});
        dataService.remove("my-plants", id);
      }
    })
  ),
  withHooks({
    async onInit(store, dataService = inject(DataService)) {

      dataService.getAll<Plant>("my-plants").pipe(take(1)).subscribe(
        {
          next(value) {
            patchState(store, { plants : value});
            store.DetectAlert();
          },
        }
      );
    },
    onDestroy(store) {
      console.log('count on destroy');
    },
  }),
);
