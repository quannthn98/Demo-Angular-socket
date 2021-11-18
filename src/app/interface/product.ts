import {Category} from './category';

export interface Product {
  id?: number;
  name?: string;
  quantity?: number;
  image?: string;
  manufacturer?: string;
  category?: Category;
}
