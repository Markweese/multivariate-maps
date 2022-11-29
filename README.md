# multivariate-maps

A visualization application built around a light base of reusable map, chart, and general UI components. The back end is python (2.7 😱), Flask, and pandas for some data extraction methods and a simple API interface.

## Run the app
- clone the repo
- [install](https://docs.docker.com/get-docker/) docker/docker compose
- from the root dir run `docker-compose up --build`
- view the app at localhost:3050

## Structure notes:

- /api: the python/flask API that serves as a lightweight interface layer.
  - /app: main.py for flask api config, extraction methods housed in `sample_modules`, general utils in `sample_utils`.
    - /data: a place where you can put some CSVs/data files if you want to run light w.o a db connection.
- /client: the front end application, built with [vite](https://vitejs.dev/guide/) and written in Vue.
- /ngnix: included for production releases, definitly overkill for a dev environment.
