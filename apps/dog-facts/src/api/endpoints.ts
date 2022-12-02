import { IGetFacts } from '../app/types/fact';
import api from './config';

export const fetchFacts = (): Promise<IGetFacts> =>
  api.get('/facts').then((response) => response.data);
