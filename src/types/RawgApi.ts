export interface RawgGame {
  name: string;
  released: string;
  id: number;
  developers: RawgDeveloper[];
}

export interface RawgDeveloper {
  name: string;
  id: number;
}

export interface RawgSearchResult {
  name: string;
  id: string;
}
export interface RawgSearchResponse {
  count: string;
  next: number | null;
  previous: number | null;
  results: RawgSearchResult[];
}
