from sqlalchemy import Column, ForeignKey, Integer, String
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

    samples = relationship("Sample", back_populates="sample_group")


class Sample(Base):
    __tablename__ = "samples"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    sample_group_id = Column(Integer, ForeignKey("sample_group.id"))

    sample_group = relationship("SampleGroup", back_populates="samples")
