1) Auth
2) Winstom logger
3) Routes
4) Image upload (upload.js & uploadRemote.js)
5) Sequelize (seeder, migrations)
6) Swagger Support (localhost:3000/swagger)
7) Centralized response parser
8) Config , enviornment variable support
9) Docker support :
	docker build -t <username>/<appname> .
	docker run -p 3001:3000 -d <username>/<appname>

i.e 
docker build -t gaurav89/node-web-app .
docker run -p 3001:3000 -d gaurav89/node-web-app
10) read values from .env file for enviornment variable
