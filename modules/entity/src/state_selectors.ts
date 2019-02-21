import { EntityState, EntitySelectors, Dictionary } from './models';

export function createSelectorsFactory<T>() {
  function getSelectors(): EntitySelectors<T, EntityState<T>>;
  function getSelectors<V>(
    selectState: (state: V) => EntityState<T>
  ): EntitySelectors<T, V>;
  function getSelectors(
    selectState?: (state: any) => EntityState<T>
  ): EntitySelectors<T, any> {
    const selectIds = (state: any) => state.ids;
    const selectEntities = (state: EntityState<T>) => state.entities;
    const selectAll = (state: EntityState<T>): T[] => {
      const ids: T[] = selectIds(state);
      const entities: Dictionary<T> = selectEntities(state);
      return ids.map((id: any) => (entities as any)[id]);
    };

    const selectTotal = (state: EntityState<T>) => state.ids.length;

    if (!selectState) {
      return {
        selectIds,
        selectEntities,
        selectAll,
        selectTotal,
      };
    }

    const createSelector = (selector: (s: EntityState<T>) => any) => (
      state: any
    ) => selector(selectState(state));

    return {
      selectIds: createSelector(selectIds),
      selectEntities: createSelector(selectEntities),
      selectAll: createSelector(selectAll),
      selectTotal: createSelector(selectTotal),
    };
  }

  return { getSelectors };
}
