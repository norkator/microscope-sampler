from pydantic import BaseModel


class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    name: str

    class Config:
        orm_mode = True


# --------------------------------------------

class SampleBase(BaseModel):
    title: str
    description: str | None = None


class SampleCreate(SampleBase):
    pass


class Sample(SampleBase):
    sample_group: int

    class Config:
        orm_mode = True


# --------------------------------------------

class SampleGroupBase(BaseModel):
    name: str
    category: str


class SampleGroupCreate(SampleGroupBase):
    name: str
    category: str


class SampleGroup(SampleGroupBase):
    name: str
    category: str
    samples: list[Sample] = []

    class Config:
        orm_mode = True
