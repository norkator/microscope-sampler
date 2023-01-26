from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Boolean
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
    centrifuge_minutes = Column(Integer)
    centrifuge_rpm = Column(Integer)
    centrifuge_rcf = Column(Integer)  # relative centrifugal force


class Sample(Base):
    __tablename__ = "sample"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    date_time = Column(DateTime, index=False)
    description = Column(String, index=True)
    sample_group_id = Column(Integer, ForeignKey("sample_group.id"))
    centrifuge_minutes = Column(Integer)
    centrifuge_rpm = Column(Integer)
    centrifuge_rcf = Column(Integer)  # relative centrifugal force
    centrifugation_completed = Column(Boolean)


class Image(Base):
    __tablename__ = "image"

    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String, index=False)
    sample_id = Column(Integer, ForeignKey("sample.id"), index=True)
