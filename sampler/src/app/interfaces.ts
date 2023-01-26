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
  centrifuge_minutes: number;
  centrifuge_rpm: number;
  centrifuge_rcf: number;
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
  imageData?: any;
}
