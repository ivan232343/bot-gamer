module.exports = {
    potencias: function (ont, olt, diff) {
        console.log(ont, olt, diff)
        let requerido = {
            type: "no require",
            vt: false
        }
        if (diff <= -5.5) {
            requerido.type = "degradado en diferencias"
            requerido.vt = true
        }
        if (ont < -25.50 && olt < -31.00) {
            requerido.type = "degradado"
            requerido.vt = true

        }

        // vt = (ont > -25.50 && olt > -31.00) ? ((diff <= -5.5) ? true : false) : true;
        return requerido;
    }
}