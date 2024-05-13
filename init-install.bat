@echo off
ECHO "Iniciando la instalacion de modulos" 
start /min npm install
ECHO "Inicializando config.json" 
SET /p TOKEN_BOT=Introduzca el token del bot: 
SET /p BD_USER=Introduzca el usuario de la base de datos: 
SET /p BD_PASSWORD=Introduzca la password de la base de datos: 
SET /p BD_MAIN=Introduzca el nombre de la base de datos a usar: 

echo {"token":"%TOKEN_BOT%" , "guildId": ["1215716246172213398"],  "clientId": "1220815878157766807",  "channelId": "1117975646228971622",  "areaATcliente": "1215716247568912429",  "areaValidacion": "1221722912868794383",  "areaVAsesor": "1223082009551699969",  "host": "localhost",  "user": "%BD_USER%",  "password": "%BD_PASSWORD%",  "database": "%BD_MAIN%" } > "config.json"
ECHO "No se olvide de colocar el token y la configuracion de la base de datos" && exit 
