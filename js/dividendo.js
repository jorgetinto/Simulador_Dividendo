$(function(){
   /* slider bar */
    $("#slideMonto").slider();
      $("#slideMonto").on("slide", function(slideEvt) {
         $("#montoSlideVal").text(slideEvt.value);
    });

    $("#slidePlazo").slider();
      $("#slidePlazo").on("slide", function(slideEvt) {
         $("#plazoSlideVal").text(slideEvt.value);
    });

    $("#slideInteres").slider();
      $("#slideInteres").on("slide", function(slideEvt) {
         $("#interesSlideVal").text(slideEvt.value);
    });

  /* Se incorpora Uf desde una api */
  $.getJSON('http://www.mindicador.cl/api', function(data) {
      var dailyIndicators = data,
      ufRound = Math.floor(dailyIndicators.uf.valor),
      ufClp = formatNumber.new(ufRound, "$");
      $("#hiddenUf").html(ufRound);
      $("<span/>", {
          html: ufClp
      }).appendTo("#valorUf");
          }).fail(function() {
              console.log('Error al consumir la API!');
      });
    });

  /* Se realiza el calculo del dividendo */
$( "#calcular" ).click(function() {
    var monto = $("#montoSlideVal").text(),
    plazo = $("#plazoSlideVal").text(),
    interes = $("#interesSlideVal").text(),
    valUf = $("#hiddenUf").text();
    $("#inputSuccess1").val("0");

    if (monto <= 0) {
      $("#textMuted").html("* Debe seleccionar un monto en UF.");
      $("#alertError").show();
    }else if (plazo <= 0) {
      $("#textMuted").html("* Debe seleccionar un plazo.");
      $("#alertError").show();
    }else if (interes <= 0) {
      $("#textMuted").html("* Debe seleccionar una tasa de interes.");
      $("#alertError").show();
    }else {
      var total = Math.floor(((monto * valUf) / (plazo*12))*interes);
        $("#inputSuccess1").val( formatNumber.new(total, "$"));
        $("#calculo").show();
    }
});

  /* cierra el alert al momento de mover el slide */
 $( "#slideMonto").change(function() {
       fadeOut();
 });
 $("#slidePlazo").change(function() {
       fadeOut();
 });
 $("#slideInteres").change(function() {
       fadeOut();
 });

 function fadeOut() {
    $("#alertError").fadeOut(600);
 }

  /* formato moneda */
 var formatNumber = {
 separador: ".",
 sepDecimal: ',',
 formatear:function (num){
  num +='';
  var splitStr = num.split('.');
  var splitLeft = splitStr[0];
  var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
  var regx = /(\d+)(\d{3})/;
  while (regx.test(splitLeft)) {
  splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
  }
  return this.simbol + splitLeft  +splitRight;
 },
 new:function(num, simbol){
  this.simbol = simbol ||'';
  return this.formatear(num);
 }
}
