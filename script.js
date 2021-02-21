exports.contador_periodo = function(req, res) {
    
    if ( req.body ) {
        var hora_entrada = req.body.entry.hour
        var minuto_entrada = req.body.entry.minute
        var hora_saida = req.body.departure.hour
        var minuto_saida = req.body.departure.minute
    }

    if ( hora_entrada > hora_saida ) {
        hora_saida += 24
    }

    var hora_entrada_minutos = hora_entrada * 60 + minuto_entrada
    var hora_saida_minutos = hora_saida * 60 + minuto_saida
    var jornada_trabalho = Math.abs(hora_saida_minutos - hora_entrada_minutos)

    if ( hora_entrada_minutos == hora_saida_minutos  ) {
        jornada_trabalho = 24 * 60
    }

    let jornada_diurno = 0

    while( jornada_trabalho != 0 ) {

        if ( hora_entrada_minutos == 1440 ) hora_entrada_minutos = 0

        // Período diurno
        if ( hora_entrada_minutos >= 300 && hora_entrada_minutos < 1320 ) {
            jornada_diurno++
        }
        jornada_trabalho--
        hora_entrada_minutos++
    }

    res.json({
        dayTime: jornada_diurno
    })
}

