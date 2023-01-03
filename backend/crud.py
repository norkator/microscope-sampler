from sqlalchemy.orm import Session

import models
import schemas


# --------------------------------------------

def get_category(db: Session, category_id: int):
    return db.query(models.Category).filter(models.Category.id == category_id).first()


def get_category_by_name(db: Session, name: str):
    return db.query(models.Category).filter(models.Category.name == name).first()


def get_categories(db: Session):
    return db.query(models.Category).all()


def create_category(db: Session, category: schemas.CategoryCreate):
    db_category = models.Category(name=category.name)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


# --------------------------------------------

def get_sample_group(db: Session, sample_group_id: int):
    return db.query(models.SampleGroup).filter(models.SampleGroup.id == sample_group_id).first()


def get_sample_groups(db: Session, category_id: int):
    return db.query(models.SampleGroup).filter(models.SampleGroup.category_id == category_id).all()


def get_sample_group_by_name(db: Session, name: str):
    return db.query(models.SampleGroup).filter(models.SampleGroup.name == name).first()


def create_sample_group(db: Session, sample_group: schemas.SampleGroupCreate):
    db_sample_group = models.SampleGroup(
        name=sample_group.name, category_id=sample_group.category_id
    )
    db.add(db_sample_group)
    db.commit()
    db.refresh(db_sample_group)
    return db_sample_group

# --------------------------------------------
