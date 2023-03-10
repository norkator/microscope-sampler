from fastapi import FastAPI, Depends, HTTPException, UploadFile, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import shutil
import os

import models
import schemas
import crud
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

IMAGE_FOLDER = os.getcwd() + '/images/'

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


# --------------------------------------------

@app.get("/")
async def read_root():
    return {}


@app.get("/health")
async def get_health():
    return {"status": "ok"}


# --------------------------------------------

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


# --------------------------------------------

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


# --------------------------------------------

@app.get("/samples/{sample_group_id}", response_model=list[schemas.Sample])
async def get_samples(sample_group_id: int, db: Session = Depends(get_db)):
    return crud.get_samples(db, sample_group_id)


@app.get("/sample/{sample_id}", response_model=schemas.Sample)
async def get_sample(sample_id: int, db: Session = Depends(get_db)):
    return crud.get_sample(db, sample_id)


@app.post("/sample")
async def create_sample(sample: schemas.SampleCreate, db: Session = Depends(get_db)):
    db_sample = crud.get_sample_by_name_and_group(db, name=sample.name, sample_group_id=sample.sample_group_id)
    if db_sample:
        raise HTTPException(status_code=400, detail="Sample name within same sample group already exists")
    return crud.create_sample(db=db, sample=sample)


@app.put("/sample", response_model=schemas.Sample)
async def update_sample(sample: schemas.Sample, db: Session = Depends(get_db)):
    db_sample = crud.get_sample(db, sample_id=sample.id)
    if not db_sample:
        raise HTTPException(status_code=400, detail="Sample not found with given sample id")
    return crud.update_sample(db, sample, db_sample)


@app.post("/sample-image")
async def upload_sample_image(request: Request, db: Session = Depends(get_db), file: UploadFile | None = None):
    if not file:
        raise HTTPException(status_code=400, detail="No upload file sent")
    else:
        sample_id = int(request.headers.get('sampleid'))
        db_image = crud.create_image(db, file.filename, sample_id)
        if db_image.id:
            with open(IMAGE_FOLDER + file.filename, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            return {"sampleId": sample_id, "filename": file.filename}
        else:
            raise HTTPException(status_code=400, detail="Inserting db image row failed")


@app.get("/sample-images/{sample_id}", response_model=list[schemas.Image])
async def get_sample_images(sample_id: int, db: Session = Depends(get_db)):
    return crud.get_images(db, sample_id)


@app.get("/sample-image/{file_name}")
async def get_sample_image_data(file_name: str):
    return FileResponse(path=IMAGE_FOLDER + file_name, filename=file_name, media_type='image/jpeg')


@app.delete("/sample-image/{image_id}")
async def delete_sample_image(image_id: int, db: Session = Depends(get_db)):
    db_image = crud.get_image(db=db, image_id=image_id)
    if not db_image:
        raise HTTPException(status_code=400, detail="Image not found with id")
    else:
        os.remove(IMAGE_FOLDER + db_image.file_name)
        crud.delete_image(db=db, db_image=db_image)
        return {"removed": True}

# --------------------------------------------
