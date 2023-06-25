export interface RootObject {
  data: Datas[];
  links: Link[];
  metadata: Metadata;
}

interface Metadata {
  currentOffset: number;
  totalCount: number;
}

interface Link {
  rel: string;
  href: string;
}

export interface Datas {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
}
