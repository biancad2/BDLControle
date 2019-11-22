$()

function alugar(){
   var div = $(".form-off");
    var div2 = $(".container-locacao")
    div2.addClass("show-cont");
    div.removeClass("form-off");
    div.addClass("form-on");
}

function cancelar(){
    var confirma = window.confirm("Cancelar locação?");  
    if(confirma)  {	alert("Locação cancelada");   var div = $(".form-on"); div.removeClass("form-on"); div.addClass("form-off");}  else  {	alert("cancelado");  };
    
}