import {Tag} from './tag';

export interface Company {
  id: number;
  name: String;
  address: String;
  turnover: number;
  ceo: String;
  catchphrase: String;
  logo: String;
  industry: String;
  url: String;
  latitude: number;
  longitude: number;
  tags: Tag[];
}
