module.exports = {
    toUTC: function (datetime) {
        const date = new Date(datetime);
        // Obtener la hora local
        const localTime = date.getTime();
        // Obtener la diferencia de tiempo en milisegundos
        const offset = -5 * 60 * 60 * 1000;
        // Calcular la hora UTC -5:00
        const utcTime = localTime + offset;
        // Crear una nueva fecha a partir de la hora UTC -5:00
        return new Date(utcTime);

    }
}