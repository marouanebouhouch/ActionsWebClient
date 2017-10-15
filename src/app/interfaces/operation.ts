import {Company} from './company';

export interface Operation {
  id: number;
  nb_actions: number;
  price_action: number;
  date_action: Date;
  company: Company;
}
