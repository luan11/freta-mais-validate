var hora_saida = $('#hora_saida');
var hora_retorno = $('#hora_retorno');
var aux_valor_saida = $('#guarda_valor_saida');
var aux_valor_retorno = $('#guarda_valor_retorno');
var sel_saida = $('#sel_saida');
var sel_retorno = $('#sel_retorno');
var tipoDiaria_meia = $('#meia');
var tipoDiaria_completa = $('#completa');

hora_saida.on('change',function(){
     var horario_saida = hora_saida.val();
     horario_saida = toCalc(horario_saida);
     if (horario_saida !== ""){
          aux_valor_saida.attr('value',horario_saida);
          sel_saida.attr('disabled','disabled');
     }
})

hora_retorno.on('click', function(){
     if (aux_valor_saida.val() === "" && aux_valor_retorno.val() === ""){
          alert("Selecione o horário de saída primeiro!");
     }else{
     hora_retorno.on('change',function(){
          var horario_retorno = hora_retorno.val();
          horario_retorno = toCalc(horario_retorno);
          if (horario_retorno !== ""){
               aux_valor_retorno.attr('value',horario_retorno);
               sel_retorno.attr('disabled','disabled');
               var diariaSelecionada = $('#tipo_diaria option:selected').val();
          }
          if (aux_valor_saida.val() !== "" && aux_valor_retorno.val() !== ""){
               var diff_hours = calcHours(aux_valor_saida.val(),aux_valor_retorno.val());
               if (diff_hours == 0){
                     if (diariaSelecionada == "meia"){
                         tipoDiaria_meia.removeAttr('selected');
                         tipoDiaria_completa.removeAttr('disabled');
                    }
                    tipoDiaria_meia.attr('disabled','disabled');
                    tipoDiaria_completa.attr('selected','selected');
               }else{
                    if (diff_hours > 6){
                         if (diariaSelecionada == "meia"){
                              tipoDiaria_meia.removeAttr('selected');
                              tipoDiaria_completa.removeAttr('disabled');
                    }
                    tipoDiaria_meia.attr('disabled','disabled');
                    tipoDiaria_completa.attr('selected','selected');
               }
                    if (diff_hours <= 6){
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

// convert to calc
function toCalc(hour){
     hour = hour.substr(0,2)+"."+hour.substr(2);
     return hour;
}

function calcHours(hourGoing,hourReturn){
     hourGoing = hourGoing.split(".");
     hourReturn = hourReturn.split(".");
     hourGoing[0] = parseInt(hourGoing[0]);
     hourGoing[1] = parseInt(hourGoing[1]);
     hourReturn[0] = parseInt(hourReturn[0]);
     hourReturn[1] = parseInt(hourReturn[1]);

     // calc indice 0 do array
     if (hourGoing[0] < hourReturn[0]){
          var diff_0 = hourReturn[0] - hourGoing[0];
     }
     if (hourGoing[0] > hourReturn[0]){
          var diff_0 = 24 - hourGoing[0] + hourReturn[0];
     }
     if (hourGoing[0] == hourReturn[0]){
          var diff_0 = 0;
     }

     // calc indice 1 do array
     if (hourGoing[1] < hourReturn[1]){
          var diff_1 = hourReturn[1] - hourGoing[1];
     }
     if (hourGoing[1] > hourReturn[1]){
          var diff_1 =  hourGoing[1] - hourReturn[1];
     }
     if (hourGoing[1] == hourReturn[1]){
          var diff_1 = 0;
     }

     // verifica se hora de retorno é menor que a hora de saida e a diferença seja igual à 0
     if (hourGoing[0] == hourReturn[0] && diff_0 == 0 && diff_1 == 30){
          diff_0 = 23;
     }

     // finaliza calc
     /* ---------------------- */
     if ((hourGoing[0] < hourReturn[0] || hourGoing[0] > hourReturn[0]) && hourGoing[1] > hourReturn[1]){
          var diff = [diff_0,diff_1];
          diff = diff.join(".");
          diff = parseFloat((parseFloat(diff,10) - 1.0).toFixed(2));
     }else{
          var diff = [diff_0,diff_1];
          diff = diff.join(".");
          diff = parseFloat(diff);
     }
     /* ---------------------- */

     // return calc
     return diff;
}