#!/bin/sh
set -ue
rundir=$(cd -P -- "$(dirname -- "$0")" && printf '%s\n' "$(pwd -P)")
cd "$rundir"
echo "Iniciando la instalacion de modulos" 
npm install
echo "Inicializando config.json" 
read -p "Introduzca el token del bot: " TOKEN_BOT
read -p "Introduzca el host de la base de datos: " REMOTE_HOST
read -p "Introduzca el usuario de la base de datos: " REMOTE_USER
read -p "Introduzca la password de la base de datos: " REMOTE_PASSWORD
read -p "Introduzca el nombre de la base de datos a usar: " REMOTE_BD
read -p "Introduzca la contraseña root del entorno local para crear los usuarios necesarios para la instalacion: " LOCAL_ROOT

echo "{\"token\":\"${TOKEN_BOT}\" , \"guildId\": [\"1215716246172213398\"],  \"clientId\": \"1220815878157766807\",     \"LOCAL_HOST\": \"localhost\",    \"LOCAL_USER\": \"ejecutor-gamer\",    \"LOCAL_PASSWORD\": \"vi1uMa2AXu67\",    \"LOCAL_DB\": \"bd_gamer_data\",    \"REMOTE_HOST\": \"${REMOTE_HOST}\",    \"REMOTE_USER\": \"${REMOTE_USER}\",    \"REMOTE_PASSWORD\": \"${REMOTE_PASSWORD}\",    \"REMOTE_DB\": \"${REMOTE_BD}\"}" > "config.json" 
echo "creando base de datos local" 
mysql -h localhost -u root -p$LOCAL_ROOT < "$rundir/database/rebuild.sql"
echo "creando los usuarios local" 
mysql -h localhost -u root -p$LOCAL_ROOT < "$rundir/database/users.sql"
