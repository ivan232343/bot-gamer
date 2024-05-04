module.exports = {
    dividirArray: (array, tamañoGrupo) => {
        let resultado = [];
        for (let i = 0; i < array.length; i += tamañoGrupo) {
            let grupo = array.slice(i, i + tamañoGrupo);
            resultado.push(grupo);
        }
        return resultado;
    }
}