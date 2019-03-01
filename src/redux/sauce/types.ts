export interface ISauce {
  _id: number;
  name: string;
  ingredients: string;
  author: string;
  created: Date;
  types?: string[];
  maker: string;
  description: string;
  photo?: string;
  shu?: number | string;
  reviews?: string[];
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  tags?: string[];
}

// Trimmed down for reference only
export interface ISauceRef {
  _id?: number | string;
  slug: string;
}
