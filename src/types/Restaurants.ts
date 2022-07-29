export type RestaurantsResponse = {
  results: Result[];
};

export type Result = {
  title: string;
  highlightedTitle: string;
  type: Type;
  resultType: ResultType;
  vicinity?: string;
  highlightedVicinity?: string;
  position?: number[];
  category?: string;
  categoryTitle?: string;
  distance?: number;
  chainIds?: string[];
  bbox?: number[];
};

export enum ResultType {
  Address = 'address',
  Chain = 'chain',
  Place = 'place',
}

export enum Type {
  UrnNLPTypesPlace = 'urn:nlp-types:place',
  UrnNLPTypesSearch = 'urn:nlp-types:search',
}
