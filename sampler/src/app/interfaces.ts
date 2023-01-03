export interface CategoryInterface {
  id: number;
  name: string;
}

export interface SampleGroupInterface {
  id: number;
  name: string;
  description: string;
  category_id: number;
}
