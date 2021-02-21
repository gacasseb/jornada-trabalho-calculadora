/**
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * Conta o horário trabalhado no período diurno e noturno
 * 
 * @return {object}
 */
exports.contador_periodo = function(req, res) {
    
    if ( ! validateData ) {
        return res.json({
            message: 'error'
        })
    }

    // Prepara os dados
    let data = prepareData(req.body)

    let jornada_diurno = 0
    let aux = data.jornada_trabalho
    let { hora_entrada_minutos } = data

    while( aux != 0 ) {

        if ( hora_entrada_minutos == 1440 ) hora_entrada_minutos = 0

        // Período diurno
        if ( hora_entrada_minutos >= 300 && hora_entrada_minutos < 1320 ) {
            jornada_diurno++
        }
        aux--
        hora_entrada_minutos++
    }

    let jornada_noturno = data.jornada_trabalho - jornada_diurno

    // Converte de volta para horas e minutos
    let jornada_noturno_hora = parseInt(jornada_noturno / 60)
    let jornada_noturno_minuto = (jornada_noturno % 60)

    let jornada_diurno_hora = parseInt(jornada_diurno / 60)
    let jornada_diurno_minuto = (jornada_diurno % 60)

    res.json({
        dayTime: {
            hour: jornada_diurno_hora,
            minute: jornada_diurno_minuto
        },
        nocturnalTime: {
            hour: jornada_noturno_hora,
            minute: jornada_noturno_minuto
        }
    })
}

/**
 * Faz a validação dos dados de requisição
 * 
 * @param {object} req 
 */
function validateData(req) {

    if ( ! req.body.data ) {
        return false
    } 

    let data = req.body.data

    // Valida se existe os dados
    if ( data.entry && data.departure ) {
        // Valida se as horas de entrada estão entre 0 e 24
        if ( data.entry.hora_entrada >= 0
            && data.entry.hora_entrada <= 24
            && data.departure.hora_entrada >= 0
            && data.departure.hora_entrada <= 24 ) {

            // Verifica se as horas de saída estão entre 0 e 24
            if ( data.entry.hora_entrada >= 0 &&
                data.entry.hora_entrada <= 24 &&
                data.entry.hora_saida >= 0 &&
                data.entry.hora_saida <= 60 ) {

                return true
            }
        }
    }

    return false;
}

/**
 * Prepara os dados 
 * 
 * @param {object} data 
 * 
 * @return {object} time
 */
function prepareData(data) {

    // Recebe os dados da requisição
    let hora_entrada = data.entry.hour
    let minuto_entrada = data.entry.minute
    let hora_saida = data.departure.hour
    let minuto_saida = data.departure.minute

    if ( hora_entrada > hora_saida ) {
        hora_saida += 24
    }

    // Transforma para horas em minutos
    var hora_entrada_minutos = hora_entrada * 60 + minuto_entrada
    var hora_saida_minutos = hora_saida * 60 + minuto_saida

    // Calcula jornada de trabalho em minutos
    var jornada_trabalho = Math.abs(hora_saida_minutos - hora_entrada_minutos)

    // Caso os horários de entrada e saída forem iguais, o período é de 24 horas transformados em minutos
    if ( hora_entrada_minutos == hora_saida_minutos  ) {
        jornada_trabalho = 24 * 60
    }

    if ( hora_entrada_minutos > hora_saida_minutos ) {
        jornada_trabalho = 1440 - jornada_trabalho
    }

    let time = {
        jornada_trabalho: jornada_trabalho,
        hora_entrada_minutos: hora_entrada_minutos
    }

    return time
}

