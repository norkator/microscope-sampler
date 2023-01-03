# Microscope sampler

[WORK IN PROGRESS]

Microscope sampler is a web app build for use to manage microscope sample images. Intended
case of use consists defining sample categories, taking samples containing images,
saving them with basic information which then as a group creates sample group.
Sample groups are added under categories which gives this app it's purpose as a sample
image manager app. This app is intended to help with your own research and work as a
simple data store.

### Planned development

* Directly connect to microscope camera interface connected to computer.
* Sample images could be compared with earlier records.
* Intended to be run as docker container. All data is saved locally
  on sqlite database and local resource folder which contains saved images.
* Maybe as an online hosted service with accounts.

### Attributions
* Need to create attribution page for logo [Germ icons created by Smashicons - Flaticon](https://www.flaticon.com/free-icons/germ)

## Getting started as user

Todo...

## Getting started as developer

Backend is based on `fastapi` https://fastapi.tiangolo.com/

Frontend is based on Angular.

### Backend

on `backend` define python interpreter and create venv environment.
Then install required packages from `requirements.txt`

```shell
pip install -r requirements.txt
```

Make sure python venv is active and then run backend app:

```shell
uvicorn main:app --reload
```

### Frontend

Install dependencies

```shell
npm install
```

Run frontend

```shell
npm run start
```