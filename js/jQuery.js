var lista_preguntas=new Array();
var indice_pregunta=0;
$(document).ready(
function()
		{
			cargarXML();
				$("#btn_comprobar").click(function(){comprobar()});
				$("#texto_pregunta").hide();
		}
);
function cargarXML()
{
	$.get( "http://formadorestic.com/pasapalabra/carga.php?IDpartida=3000", function( data ) {
	tratarXML(data);
  
});
}
function tratarXML(xml)
{
	var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml,"text/xml");
	
	var lista_elementos_pregunta=xmlDoc.getElementsByTagName("pregunta");
	for(i=0; i<lista_elementos_pregunta.length; i++)
	{
		var elemento_pregunta=lista_elementos_pregunta[i];
		var letra=elemento_pregunta.getElementsByTagName("letra")[0].childNodes[0].nodeValue;
		var posicion=elemento_pregunta.getElementsByTagName("posicion")[0].childNodes[0].nodeValue;
		var definicion=elemento_pregunta.getElementsByTagName("definicion")[0].childNodes[0].nodeValue;
		var solucion=elemento_pregunta.getElementsByTagName("solucion")[0].childNodes[0].nodeValue;
		//Formamos un objeto en javascript
		var pregunta={letra: letra, posicion: posicion, definicion: definicion, solucion: solucion};
		//Metemos la lista en el array
		lista_preguntas.push(pregunta);
	}
	//return lista_preguntas;
	mostrarPreguntas();
}
function mostrarPreguntas(){
	//Tiene que conocer la lista de preguntas y por cual va
	var pregunta=lista_preguntas[indice_pregunta];
	var aux=pregunta.posicion+" "+pregunta.letra+": "+pregunta.definicion;
	$("#texto_pregunta").text(aux);
	$("#texto_pregunta").fadeIn(1500);
}
function comprobar()
{
	var respuesta_usuario=$("#respuesta").val();
	var pregunta_actual=lista_preguntas[indice_pregunta];
	var respuesta_correcta=pregunta_actual.solucion;
	if(respuesta_usuario.toUpperCase()==respuesta_correcta.toUpperCase())
	{		alert("Enhorabuena");	}
	else	{		alert("No, la respuesta era: "+respuesta_correcta);	}
	indice_pregunta++;
	$("#texto_pregunta").fadeOut(500, function(){mostrarPreguntas();});	
}