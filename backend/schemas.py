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


class Sample(SampleBase):
    id: int
    name: str
    date_time: datetime
    description: str | None = None
    sample_group_id: int

    class Config:
        orm_mode = True


# --------------------------------------------

class SampleGroupBase(BaseModel):
    name: str
    category_id: int


class SampleGroupCreate(SampleGroupBase):
    name: str
    category_id: int


class SampleGroup(SampleGroupBase):
    id: int
    name: str
    category_id: int
    category: Category

    # samples: list[Sample] = []

    class Config:
        orm_mode = True
