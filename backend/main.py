from typing import Union

from fastapi import FastAPI

import models
import schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


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


@app.get("/categories")
async def get_categories():
    return {"categories": [{"id": 1, "name": "Blood samples"}, {"id": 2, "name": "Something else"}]}
