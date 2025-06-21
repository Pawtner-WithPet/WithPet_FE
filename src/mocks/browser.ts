import { setupWorker } from 'msw';
import { handlers } from './doginfo';

export const worker = setupWorker(...handlers);