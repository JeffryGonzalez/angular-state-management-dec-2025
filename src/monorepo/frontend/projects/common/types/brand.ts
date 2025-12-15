declare const brand: unique symbol;

export type Brand<T, TBrand> = T & { [brand]: TBrand };

type EntityType = { id: string };
export function brandEntities<
  TFrom extends EntityType,
  TTo extends TFrom & { id: Brand },
  Brand,
>(items: TFrom[]): TTo[] {
  return items.map(
    (item) =>
      ({
        ...item,
        id: item.id as Brand,
      }) as TTo,
  );
}
