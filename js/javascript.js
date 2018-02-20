// Variables globales //
var json;
var json2;
var datosPistas = [];

var contenido = [];
var tipo;
var reproductor;

var pistaEjecutada;

window.onload = function () {
    LecturaJson();
    asignarEventos();

    $('body').on('click', '#contenedor-pistas ul li', function () {
        var idPista = $(this).attr('id');
        selectorPista(idPista);
    })

    $('#reproductor').on('timeupdate', function () {
        actualizarBarra();
    })
}

// Funcion para leer JSON //
function LecturaJson() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        json = xhttp.responseText;
        json2 = JSON.parse(json);
    };
    xhttp.open("GET", "js/playlist.json", false);
    xhttp.send();

    for (var i in json2) {
        contenido.push(json2[i].track);
    }

    playlist();
    crearLista(json2);
}

// Funcion para inicializar la lista de reproduccion //
function playlist() {
    reproductor = document.getElementById("reproductor");
    info = document.getElementById("info");

    if (screen.width < 400) {
        info.innerHTML = "Vídeo: " + contenido[0];
        reproductor.src = "videos/" + contenido[0] + "-1.mp4";
    } else {
        info.innerHTML = "Vídeo: " + contenido[0];
        reproductor.src = "videos/" + contenido[0] + ".mp4";
    }
    reproductor.play();
    
    reproductor.addEventListener("ended", function () {
        siguientePista();
    }, false);
}

// Función para avanzar a la siguiente pista //
function siguientePista() {
    var nombreActual = info.innerHTML.split(": ")[1];
    var actual = contenido.indexOf(nombreActual);
    tipo = nombreActual.replace(/[0-9]+/g, "");
    actual = actual == contenido.length - 1 ? 0 : actual + 1;
    if (tipo == "video") {
        reproductor.src = "audios/" + contenido[actual] + ".mp3";
        info.innerHTML = "audios: " + contenido[actual];
    } else {
        if (contenido[actual] == "video2") {
            $('source').remove();
            var source = document.createElement('source');
            source.src = "videos/" + contenido[actual] + ".mp4";
            source.type = "video/mp4";
            reproductor.appendChild(source);
            var source2 = document.createElement('source');
            source2.src = "videos/" + contenido[actual] + ".webm";
            source2.type = "video/mp4";
            reproductor.appendChild(source2);
            var source3 = document.createElement('source');
            source3.src = "videos/" + contenido[actual] + ".ogg";
            source3.type = "video/mp4";
            reproductor.appendChild(source3);
            reproductor.load();
            info.innerHTML = "Video: " + contenido[actual];
            $('#reproductor').removeAttr("src");
        } else if (contenido[actual] == "video3") {
            $('source').remove();
            var source = document.createElement('source');
            source.src = "videos/" + contenido[actual] + ".mp4";
            source.type = "video/mp4";
            reproductor.appendChild(source);
            var track = document.createElement('track');
            track.label = "Español";
            track.kind = "subtitle";
            track.srclang = "es";
            track.src = "videos/subtitulos.vtt";
            reproductor.appendChild(track);
            reproductor.load();
            info.innerHTML = "Video: " + contenido[actual];
            $('#reproductor').removeAttr("src");
        } else {
            reproductor.src = "videos/" + contenido[actual] + ".mp4";
            info.innerHTML = "Video: " + contenido[actual];
        }
    }

    actual = actual + 1;
    var pistaSelect = "pista" + actual;

    var arrayLi = [];
    arrayLi.push($('li'));
    $('li').removeClass('ElementoEjecutado');
    $('#equalizer').remove();

    for (var i = 0; i < arrayLi[0].length; i++) {
        if (pistaSelect == arrayLi[0][i].id) {
            pistaEjecutada = document.getElementById(pistaSelect);
            pistaEjecutada.setAttribute('class', 'ElementoEjecutado');

            if (tipo == "video") {
                $('.ElementoEjecutado').prepend('<img src="img/musica.svg" id="equalizer"/>');
            } else {
                $('.ElementoEjecutado').prepend('<img src="img/peliculas.svg" id="equalizer"/>');
            }
        }
    }
    reproductor.play();
}

// Funcion para retroceder a la anterior pista //
function retrocederPista() {
    var nombreActual = info.innerHTML.split(": ")[1];
    var actual = contenido.indexOf(nombreActual);
    tipo = nombreActual.replace(/[0-9]+/g, "");
    if (actual <= 0) {
        actual = contenido.length;
    }
    actual = actual - 1;
    if (tipo == "video") {
        reproductor.src = "audios/" + contenido[actual] + ".mp3";
        info.innerHTML = "audios: " + contenido[actual];
    } else {
        if (contenido[actual] == "video2") {
            $('source').remove();
            var source = document.createElement('source');
            source.src = "videos/" + contenido[actual] + ".mp4";
            source.type = "video/mp4";
            reproductor.appendChild(source);
            var source2 = document.createElement('source');
            source2.src = "videos/" + contenido[actual] + ".webm";
            source2.type = "video/mp4";
            reproductor.appendChild(source2);
            var source3 = document.createElement('source');
            source3.src = "videos/" + contenido[actual] + ".ogg";
            source3.type = "video/mp4";
            reproductor.appendChild(source3);
            reproductor.load();
            info.innerHTML = "Video: " + contenido[actual];
            $('#reproductor').removeAttr("src");
        } else if (contenido[actual] == "video3") {
            $('source').remove();
            var source = document.createElement('source');
            source.src = "videos/" + contenido[actual] + ".mp4";
            source.type = "video/mp4";
            reproductor.appendChild(source);
            var track = document.createElement('track');
            track.label = "Español";
            track.kind = "subtitle";
            track.srclang = "es";
            track.src = "videos/subtitulos.vtt";
            reproductor.appendChild(track);
            reproductor.load();
            info.innerHTML = "Video: " + contenido[actual];
            $('#reproductor').removeAttr("src");
        } else {
            reproductor.src = "videos/" + contenido[actual] + ".mp4";
            info.innerHTML = "Video: " + contenido[actual];
        }
    }

    actual = actual + 1;
    var pistaSelect = "pista" + actual;

    var arrayLi = [];
    arrayLi.push($('li'));
    $('li').removeClass('ElementoEjecutado');
    $('#equalizer').remove();

    for (var i = 0; i < arrayLi[0].length; i++) {
        if (pistaSelect == arrayLi[0][i].id) {
            pistaEjecutada = document.getElementById(pistaSelect);
            pistaEjecutada.setAttribute('class', 'ElementoEjecutado');

            if (tipo == "video") {
                $('.ElementoEjecutado').prepend('<img src="img/musica.svg" id="equalizer"/>');
            } else {
                $('.ElementoEjecutado').prepend('<img src="img/peliculas.svg" id="equalizer"/>');
            }
        }
    }
    reproductor.play();
}

// Funcion para mostrar lista de reproducion //
function crearLista(pistas) {
    var contenedor = document.getElementById("contenedor-pistas");
    var lista = document.createElement('ul');
    contenedor.appendChild(lista);
    for (var i in pistas) {
        var li = document.createElement('li');
        var tipo = pistas[i].track;
        tipo = tipo.replace(/[0-9]+/g, "");
        tipo = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        if (i == "pista1") {
            li.setAttribute("class", "ElementoEjecutado");
        }
        li.textContent = tipo + ": " + pistas[i].autor + " - " + pistas[i].titulo;
        li.setAttribute('id', i);
        lista.appendChild(li);
    }
    if (tipo == "video") {
        $('.ElementoEjecutado').prepend('<img src="img/musica.svg" id="equalizer"/>');
    } else {
        $('.ElementoEjecutado').prepend('<img src="img/peliculas.svg" id="equalizer"/>');
    }
}

// Function selector de pistas //
function selectorPista(pista) {
    var datosPista = [];
    for (var i in json2) {
        if (i == pista) {
            datosPista.push(json2[i].track);
        }
    }

    var pistaSelect = datosPista.toString();
    tipo = pistaSelect.replace(/[0-9]+/g, "");
    reproductor = document.getElementById("reproductor");
    info = document.getElementById("info");
    if (tipo == "video") {
        if (datosPista[0] == "video2") {
            $('source').remove();
            var source = document.createElement('source');
            source.src = "videos/" + datosPista[0] + ".mp4";
            source.type = "video/mp4";
            reproductor.appendChild(source);
            var source2 = document.createElement('source');
            source2.src = "videos/" + datosPista[0] + ".webm";
            source2.type = "video/mp4";
            reproductor.appendChild(source2);
            var source3 = document.createElement('source');
            source3.src = "videos/" + datosPista[0] + ".ogg";
            source3.type = "video/mp4";
            reproductor.appendChild(source3);
            reproductor.load();
            info.innerHTML = "Video: " + datosPista[0];
            $('#reproductor').removeAttr("src");
        } else if (datosPista[0] == "video3") {
            $('source').remove();
            var source = document.createElement('source');
            source.src = "videos/" + datosPista[0] + ".mp4";
            source.type = "video/mp4";
            reproductor.appendChild(source);
            var track = document.createElement('track');
            track.label = "Español";
            track.kind = "subtitle";
            track.srclang = "es";
            track.src = "videos/subtitulos.vtt";
            reproductor.appendChild(track);
            reproductor.load();
            info.innerHTML = "Video: " + datosPista[0];
            $('#reproductor').removeAttr("src");
        } else {
            reproductor.src = "videos/" + datosPista[0] + ".mp4";
            info.innerHTML = "Video: " + datosPista[0];
        }
    } else {
        info.innerHTML = "Audio: " + datosPista[0];
        reproductor.src = "audios/" + datosPista[0] + ".mp3";
    }


    $('li').removeClass('ElementoEjecutado');
    $('#equalizer').remove();

    pistaEjecutada = document.getElementById(pista);
    pistaEjecutada.setAttribute('class', 'ElementoEjecutado');


    if (tipo == "video") {
        $('.ElementoEjecutado').prepend('<img src="img/peliculas.svg" id="equalizer"/>');
    } else {
        $('.ElementoEjecutado').prepend('<img src="img/musica.svg" id="equalizer"/>');
    }

    reproductor.play();
}

// Funcion parra barra de tiempo //
function actualizarBarra() {
    var currentTime = reproductor.currentTime;
    var durationTime = reproductor.duration;
    var progreso = (currentTime * 100) / durationTime;

    var estado = formatearTiempo(currentTime);
    $('.barra-progreso').css('width', progreso + '%');
    $('.estado').find('span').text(estado[0] + ':' + estado[1]);

    var duracion = formatearTiempo(durationTime);
    $('.duracion').find('span').text(duracion[0] + ':' + duracion[1]);
}

function formatearTiempo(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);

    if (seconds < 10) seconds = '0' + seconds;
    if (minutes < 10) minutes = '0' + minutes;

    // Devolvemos un array con el tiempo bien formateado
    return Array(minutes, seconds);
}

// Funcion para asignar eventos //
function asignarEventos() {
    var $botones = $('.botones');

    $($botones[0]).on('click', function () {
        retrocederPista();
    })

    $($botones[1]).on('click', function () {
        reproductor.currentTime -= 10;
    })

    $($botones[2]).on('click', function () {
        reproductor.pause();
    })

    $($botones[3]).on('click', function () {
        reproductor.play();
    })

    $($botones[4]).on('click', function () {
        reproductor.currentTime += 10;
    })

    $($botones[5]).on('click', function () {
        siguientePista();
    })

    $($botones[6]).on('click', function () {
        if (reproductor.volume != 0) {
            reproductor.volume -= 0.1;
            changeVolume(reproductor.volume);
        }
    })

    $($botones[7]).on('click', function () {
        if (reproductor.volume != 1) {
            reproductor.volume += 0.1;
            changeVolume(reproductor.volume);
        }
    })

    $($botones[8]).on('click', function () {
        reproductor.muted = true;
    })

    $($botones[9]).on('click', function () {
        reproductor.muted = false;
    })
}