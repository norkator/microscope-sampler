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
        name=sample_group.name, category_id=sample_group.category_id,
        centrifuge_minutes=sample_group.centrifuge_minutes,
        centrifuge_rpm=sample_group.centrifuge_rpm,
        centrifuge_rcf=sample_group.centrifuge_rcf
    )
    db.add(db_sample_group)
    db.commit()
    db.refresh(db_sample_group)
    return db_sample_group


# --------------------------------------------


def get_samples(db: Session, sample_group_id: int):
    return db.query(models.Sample).filter(models.Sample.sample_group_id == sample_group_id).all()


def get_sample(db: Session, sample_id: int):
    return db.query(models.Sample).filter(models.Sample.id == sample_id).first()


def get_sample_by_name_and_group(db: Session, name: str, sample_group_id: int):
    return db.query(models.Sample).filter(
        models.Sample.name == name, models.Sample.sample_group_id == sample_group_id
    ).first()


def create_sample(db: Session, sample: schemas.SampleCreate):
    db_sample = models.Sample(
        name=sample.name,
        date_time=sample.date_time,
        # description=, // todo implement later
        sample_group_id=sample.sample_group_id,
    )
    db.add(db_sample)
    db.commit()
    db.refresh(db_sample)
    return db_sample


def update_sample(db: Session, sample: schemas.Sample, db_sample: schemas.Sample):
    db_sample.name = sample.name
    db_sample.date_time = sample.date_time
    db.add(db_sample)
    db.commit()
    db.refresh(db_sample)
    return db_sample


# --------------------------------------------

def create_image(db: Session, filename: str, sample_id: int):
    db_image = models.Image(
        file_name=filename,
        sample_id=sample_id,
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image


def get_image(db: Session, image_id: int):
    return db.query(models.Image).filter(models.Image.id == image_id).first()


def get_images(db: Session, sample_id: int):
    return db.query(models.Image).filter(models.Image.sample_id == sample_id).all()


def delete_image(db: Session, db_image: models.Image):
    db.delete(db_image)
    db.commit()
