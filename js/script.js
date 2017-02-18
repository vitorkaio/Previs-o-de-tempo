function pesquisa () {
    
    var cidade = document.getElementById("cidade").value + " ";
	var obj = requisicao("http://api.openweathermap.org/data/2.5/weather?q=" + cidade)
    
    // Pegando a temperatura atual, min e max.
    var atual = obj.main.temp;
    var mim = obj.main.temp_min;
    var max = obj.main.temp_max;
    
    // Pega o icone referente ao tempo
    // Pegando icone: "<img src=\"http://openweathermap.org/img/w/" + ico[0].icon + ".png\">";
    var ico = obj.weather;
    
    
    // Pegando os dados geográficos.
    var nascer = converteHora(obj.sys.sunrise);
    var por = converteHora(obj.sys.sunset);
    var latitude = obj.coord.lat;
    var longitude = obj.coord.lon;
    var nivelMar = obj.main.sea_level;
    
    var mapa = "<iframe width=\"570\" height=\"300\" frameborder=\"0\" style=\"border:0\" src=\"https://www.google.com/maps/embed/v1/place?key=AIzaSyBmvxKoU3iMLBRRQ-PM30Y1-30OU5HzxK8&q=" + latitude + "," + longitude + "\"allowfullscreen> </iframe>"
    
    // Escrevendo a temperatura.
    document.getElementById("infoCidade").innerHTML = ico[0].main + "<img src=\"http://openweathermap.org/img/w/" + ico[0].icon + ".png\">";
	document.getElementById("tAtual").innerHTML = atual + " °C";
    document.getElementById("tMinima").innerHTML = mim + " °C";
	document.getElementById("tMaxima").innerHTML = max + " °C";
    
    // Escrevendo as informações sobre o mapa.
    document.getElementById("mapa").innerHTML = mapa;
    document.getElementById("geo").innerHTML = "Nascer do sol: " + nascer + "<br>" + "Por do Sol: " + por + "<br>" + "Latitude: " + latitude + 
        "<br>" + "Longitude: " + longitude + "<br>" + "Nível do mar: " + nivelMar;

}

// Função que faz a requisição para a url passada, converte para um objeto javascript e o retorna.
function requisicao(url) {
	// Requisição HTTP
	var req = new XMLHttpRequest();
	req.open('GET', url + "&APPID=8c9ca0dfddb5f4e3074aaee1dc85b045"  + '&units=metric', false);
	req.send();

	var out = req.responseText;
	var obj = JSON.parse(out);

	return obj;
}

// Função que converte o horário do unix para versão gregoriana.
function converteHora(timestamp){
    
    var hora = new Date(timestamp * 1000);
    var saida = hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds();
    return saida;
    
}
// Função que carrega o mapa na página.
function iniciarMapa(latitude, longitude) {
    
    var map = new google.maps.Map(document.getElementById('#test'), {
        center: {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude)
        },
        zoom: 7
    });

}