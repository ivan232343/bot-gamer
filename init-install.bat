@echo off
ECHO "Iniciando la instalacion de modulos" 
start /b npm install && pause 
ECHO "Inicializando config.json" 
echo {"token":"" , "guildId": ["1215716246172213398"],  "clientId": "1220815878157766807",  "channelId": "1117975646228971622",  "areaATcliente": "1215716247568912429",  "areaValidacion": "1221722912868794383",  "areaVAsesor": "1223082009551699969",  "host": "localhost",  "user": "",  "password": "",  "database": "" } > "config.json"
ECHO "No se olvide de colocar el token y la configuracion de la base de datos" && exit 
