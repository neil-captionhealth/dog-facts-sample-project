export interface IFactFavorites {
  [id: number | string]: {
    isFavorite: boolean;
  };
}
export interface IFact {
  id: number;
  fact: string;
  length: number;
}

export interface IGetFacts {
  data: IFact[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
