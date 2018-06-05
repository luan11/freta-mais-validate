// resgate de variaveis inciais
var horaSaida = $('#hora_saida');
var horaRetorno = $('#hora_retorno');
var guardaValor = $('#guarda_valor');
var tipoDiaria_meia = $('#meia');
var tipoDiaria_completa = $('#completa');

// pega horario de saida
horaSaida.on('change', function(){
     var horarioSaida = horaSaida.val();
     var horaSaida_convertido = convertHours(horarioSaida);
     // verifica se horario de saida é diferente de vazio
     if (horarioSaida != ""){
          guardaValor.attr('value',horaSaida_convertido);
     }
})

/* 
     verifica se o horario de saida está definido
     **se nao informa um alerta na tela**
     **se sim continua a validação**
 */
horaRetorno.on('click', function(){
     if (guardaValor.val() == ""){
          alert("Selecione o horário de saída primeiro!");
     }else{
          // pega horario de retorno
          horaRetorno.on('change', function(){
          var horarioRetorno = horaRetorno.val();
          // verifica se o horario de retorno é diferente de vazio
          if (horarioRetorno != ""){
               // pega variaveis para trabalhar o calc de horas
               var diariaSelecionada = $('#tipo_diaria option:selected').val();
               var horarioRetorno_convertido = convertHours(horarioRetorno);
               var horaSaida_valor = guardaValor.val();
               // efetua calculo de horas
               var diferenciaHoras = subHours(horaSaida_valor,horarioRetorno_convertido);
               diferenciaHoras = diferenciaHoras.replace(":",".");
               diferenciaHoras = parseFloat(diferenciaHoras);
               // faz as verficacoes do calculo de horas
               if (parseFloat(horarioRetorno_convertido.replace(":",".")) == parseFloat(horaSaida_valor.replace(":",".")) && diferenciaHoras == 0){
                         if (diariaSelecionada == "meia"){
                              tipoDiaria_meia.removeAttr('selected');
                              tipoDiaria_completa.removeAttr('disabled');
                         }
                         tipoDiaria_meia.attr('disabled','disabled');
                         tipoDiaria_completa.attr('selected','selected');
               }else{
                    if (diferenciaHoras > 6){
                         if (diariaSelecionada == "meia"){
                              tipoDiaria_meia.removeAttr('selected');
                              tipoDiaria_completa.removeAttr('disabled');
                         }
                         tipoDiaria_meia.attr('disabled','disabled');
                         tipoDiaria_completa.attr('selected','selected');
                    }
                    if (diferenciaHoras <= 6){
                         if (diariaSelecionada == "completa"){
                              tipoDiaria_meia.removeAttr('disabled');
                              tipoDiaria_completa.removeAttr('selected');
                         }
                         tipoDiaria_meia.attr('selected','selected');
                         tipoDiaria_completa.attr('disabled','disabled');
                    }
               }
          }
          })
     }
})

// convert to hours function
function convertHours(hours){
     hours = moment(hours,"HH:mm");
     hours = hours.format("HH:mm");
     return hours;
}

// sub hours function
function subHours(init,end){
     var newEnd = init.split(":");
     var initSub = moment(end,"HH:mm").subtract({hours: newEnd[0], minutes: newEnd[1]});
     initSub = initSub.format("HH:mm");
     return initSub;
}