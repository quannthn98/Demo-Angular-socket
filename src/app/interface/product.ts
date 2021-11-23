import {Category} from './category';

export interface Product {
  id?: number;
  name?: string;
  quantity?: number;
  image?: any;
  manufacturer?: string;
  category?: Category;
}
