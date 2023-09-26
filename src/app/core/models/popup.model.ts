function randomSeedGenerator(): number {
  let seed: number | string = Math.ceil(Math.random() * 100000000);
  return seed;
}

function randomIDGenerator(seed: number) {
  return seed.toString(16);
}

export class Popup {
  id: string = randomIDGenerator(randomSeedGenerator());
  state:'appear'|'disappear' = "appear";
  message?: string;
  type?: PopupType;
  options?: Partial<PopupOptions> = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  constructor(init: Partial<Popup>) {
    Object.assign(this, init);
  }
}

export type PopupType = 'success' | 'warn' | 'error' | 'info';

export type PopupOptions = {
  keepAfterRouteChange: boolean;
  autoClose: boolean;
};
