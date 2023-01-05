from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from database import Base


class Category(Base):
    __tablename__ = "sample_category"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)


class SampleGroup(Base):
    __tablename__ = "sample_group"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    category_id = Column(Integer, ForeignKey("sample_category.id"))
    category = relationship("Category")


class Sample(Base):
    __tablename__ = "sample"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    date_time = Column(DateTime, index=False)
    description = Column(String, index=True)
    sample_group_id = Column(Integer, ForeignKey("sample_group.id"))
