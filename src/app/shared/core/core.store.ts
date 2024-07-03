import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

export interface StateCore {
  currentPage: string
}

export const StateCoreInitial: StateCore = {
  currentPage : 'plants'
};

export const CoreStore = signalStore(
  { providedIn: 'root' },
  withState(StateCoreInitial),
  withMethods((store) => ({
    changePage(newPage: string) {
      patchState(store, { currentPage : newPage});
    }
  })
  )
);
