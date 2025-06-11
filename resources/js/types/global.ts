import type {route as routeFN} from 'ziggy-js';

declare global {
    const route: typeof routeFN;
}