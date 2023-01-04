from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas
import crud
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def read_root():
    return {}


@app.get("/categories", response_model=list[schemas.Category])
async def get_categories(db: Session = Depends(get_db)):
    return crud.get_categories(db)


@app.get("/category/{category_id}", response_model=schemas.Category)
async def get_category(category_id: int, db: Session = Depends(get_db)):
    return crud.get_category(db, category_id=category_id)


@app.post("/category", response_model=schemas.Category)
async def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    db_category = crud.get_category_by_name(db, name=category.name)
    if db_category:
        raise HTTPException(status_code=400, detail="Category name already exists")
    return crud.create_category(db=db, category=category)


@app.get("/sample-groups/{category_id}", response_model=list[schemas.SampleGroup])
async def get_sample_groups(category_id: int, db: Session = Depends(get_db)):
    return crud.get_sample_groups(db, category_id)


@app.get("/sample-group/{sample_group_id}", response_model=schemas.SampleGroup)
async def get_category(sample_group_id: int, db: Session = Depends(get_db)):
    return crud.get_sample_group(db, sample_group_id=sample_group_id)


@app.post("/sample-group", response_model=schemas.SampleGroup)
async def create_sample_group(sample_group: schemas.SampleGroupCreate, db: Session = Depends(get_db)):
    db_sample_group = crud.get_sample_group_by_name(db, name=sample_group.name)
    if db_sample_group:
        raise HTTPException(status_code=400, detail="Sample group name already exists")
    return crud.create_sample_group(db=db, sample_group=sample_group)
