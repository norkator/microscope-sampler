from datetime import datetime

from pydantic import BaseModel


class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: int
    name: str

    class Config:
        orm_mode = True


# --------------------------------------------

class SampleBase(BaseModel):
    name: str
    date_time: datetime
    description: str | None = None
    sample_group_id: int


class SampleCreate(SampleBase):
    name: str
    date_time: datetime
    sample_group_id: int
    centrifuge_minutes: int
    centrifuge_rpm: int
    centrifuge_rcf: int
    centrifugation_completed: bool


class Sample(SampleBase):
    id: int
    name: str
    date_time: datetime
    description: str | None = None
    sample_group_id: int
    centrifuge_minutes: int
    centrifuge_rpm: int
    centrifuge_rcf: int
    centrifugation_completed: bool

    class Config:
        orm_mode = True


# --------------------------------------------

class SampleGroupBase(BaseModel):
    name: str
    category_id: int


class SampleGroupCreate(SampleGroupBase):
    name: str
    category_id: int
    centrifuge_minutes: int
    centrifuge_rpm: int
    centrifuge_rcf: int


class SampleGroup(SampleGroupBase):
    id: int
    name: str
    category_id: int
    category: Category
    centrifuge_minutes: int
    centrifuge_rpm: int
    centrifuge_rcf: int

    # samples: list[Sample] = []

    class Config:
        orm_mode = True


# --------------------------------------------

class ImageBase(BaseModel):
    file_name: str
    sample_id: int


class ImageCreate(ImageBase):
    file_name: str
    sample_id: int


class Image(ImageBase):
    id: int
    file_name: str
    sample_id: int

    class Config:
        orm_mode = True
