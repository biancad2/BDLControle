function expandir(){
    if($("#informacoes").hasClass("informacoes"))
        $("#informacoes").removeClass("informacoes")
    else
        $("#informacoes").addClass("informacoes")
    
    if($("#mais-info").text()=="+")
        $("#mais-info").text("-")
    else
       $("#mais-info").text("+") 
}



function editar() {
    $(".editar").addClass("editando");
    $(".salvar").addClass("editando-salvar");
    $(".cancelar").addClass("editando-salvar");
    $("td").click(function () {
        var conteudoOriginal = $(this).text();
        
        $(this).addClass("celulaEmEdicao");
        $(this).html("<input type='text' value='" + conteudoOriginal + "' />");
        $(this).children().first().focus();
 
        $(this).children().first().keypress(function (e) {
            if (e.which == 13) {
                var novoConteudo = $(this).val();
                $(this).parent().text(novoConteudo);
                $(this).parent().removeClass("celulaEmEdicao");
            }
        });
         
    $(this).children().first().blur(function(){
        $(this).parent().text(conteudoOriginal);
        $(this).parent().removeClass("celulaEmEdicao");
    });
    });
    
}

function calendario(){ 
    $( "#calendario" ).datepicker({ showOn: 'button'});
}