export type ZustandSetter<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void;
export type ZustandGetter<S, A> = () => ZustandStore<S, A>;
export type SetFunction<T> = (updated: T) => void;
export type ZustandStore<S, A> = S & A;
export type StoreInitializer<S, A> = (
  set: ZustandSetter<ZustandStore<S, A>>,
  get: ZustandGetter<S, A>,
  preloadedState: Partial<S>
) => ZustandStore<S, A>;
