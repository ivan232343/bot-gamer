@echo off
ECHO "Iniciando la instalacion de modulos" 
start /b npm init 
start /b npm install
ECHO "Inicializando config.json" 
echo {"token": "MTIyMDgxNTg3ODE1Nzc2NjwNw.GwTVvk.vmeIagUK2_SgAGRoChTiXml8qraOaWOc6vwidw" , "guildId": ["1215716246172213398"],  "clientId": "1220815878157766807",  "channelId": "1117975646228971622",  "areaATcliente": "1215716247568912429",  "areaValidacion": "1221722912868794383",  "areaVAsesor": "1223082009551699969",  "host": "localhost",  "user": "ejecutor-gamer",  "password": "vi1uMa2AXu67",  "database": "bd_gamer_data" } > "config.json"
