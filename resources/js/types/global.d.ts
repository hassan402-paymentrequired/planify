import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}
export type OptionType = {
  id: number;
  name: string;
};

export type PrioritiesType = {
    id: number;
    name: string;
};