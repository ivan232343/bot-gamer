module.exports = {
    dividirArray: (array, tamanioGrupo) => {
        let resultado = [];
        for (let i = 0; i < array.length; i += tamanioGrupo) {
            let grupo = array.slice(i, i + tamanioGrupo);
            resultado.push(grupo);
        }
        return resultado;
    }
}