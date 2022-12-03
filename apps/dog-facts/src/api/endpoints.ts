import { IGetFacts } from '../app/types/fact';
import api from './config';

export const fetchFacts = (page: number): Promise<IGetFacts> =>
  api.get(`/facts?page=${page}`).then((response) => response.data);
