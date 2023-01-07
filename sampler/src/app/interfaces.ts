export interface CategoryInterface {
  id: number;
  name: string;
}

export interface SampleGroupInterface {
  id: number;
  name: string;
  description: string;
  category_id: number;
  category?: CategoryInterface;
}

export interface SampleInterface {
  id: number;
  name: string;
  date_time: string;
  description: string | null;
  sample_group_id: number;
}


export interface SampleImageInterface {
  id: number;
  file_name: string;
  sample_id: number;
}
