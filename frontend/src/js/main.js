jQuery("document").ready(function($){

    /*var menu = $('#menuu');

    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            menu.addClass("f-nav");
        } else {
            menu.removeClass("f-nav");
        }
    });*/
    $("#inputRG").mask("99.999.999-9");
    $("#inputCPF").mask("999.999.999-99");
    $("#inputTel").mask("(99)9999-9999");
    $("#inputCel").mask("(99)99999-9999");
    $('.seu-checkbox').prop('indeterminate', true);

});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
    
});



