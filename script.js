//controlar audio

var imageS = document.getElementById('soundImage');
var audioActivado = true;
var musicaFondo = document.getElementById('musicaFondo');
var tic = document.getElementById('tic');
var bloop = document.getElementById('bloop');
var breakSound = document.getElementById('break');

musicaFondo.volume -= 0.93; //bajar volumen de la musica

// reproducir efecto de tic del reloj

function ticFunction(){
    tic.play();
}

// reproducir efecto de bloop de mute

function bloopFunction(){
    bloop.play();
}

function timeToBreak() {
    breakSound.play();
}

// iniciar musica

function startMusic() {
    musicaFondo.play();
}

// funcion para el boton de mutear
function toggleMute() {    
    if (imageS.src.endsWith('button-sound.png')) {
        imageS.src = 'Image/mute.png';
        bloopFunction()
        musicaFondo.pause();
        
    } else {
        imageS.src = 'Image/button-sound.png';
        bloopFunction()
        musicaFondo.play();
    }
}

//boton de mutear
var mute = document.getElementById('mute-b');
mute.addEventListener('click', function() {
    toggleMute();
});


//Manejo del timer

var contadorIniciado = false; 
var brake = false;
var pausas = 0;

function startCountdown() {
    if (!contadorIniciado && brake == false) {
        contadorIniciado = true; 
        var tiempoInicial = 25 * 60;
        var elementoContador = document.getElementById('contador');
        elementoContador.textContent = 'Work!';
    
        setTimeout(function() {
            var intervalo = setInterval(function() {
                var minutos = Math.floor(tiempoInicial / 60);
                var segundos = tiempoInicial % 60;
                var tiempoFormateado = minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0');
                elementoContador.textContent = tiempoFormateado;
                tiempoInicial--;
                if (tiempoInicial < 0) {
                    clearInterval(intervalo);
                    contadorIniciado = false;
                    brake = true;
                    clock.addEventListener('click', iniciarContador);
                    setTimeout(function() {
                        startCountdown();
                    }, 1000);
                    
                }
            }, 1000);

        }, 1600);
        clock.removeEventListener('click', iniciarContador);
        counter.removeEventListener('click', iniciarContador);
    }else if ( pausas < 4 ) {
        var tiempoInicial = 5 * 60;
        var elementoContador = document.getElementById('contador');
        timeToBreak()
        elementoContador.textContent = 'Break';
        pausas++;
        musicaFondo.pause();
        setTimeout(function() {
            var intervalo = setInterval(function() {
                var minutos = Math.floor(tiempoInicial / 60);
                var segundos = tiempoInicial % 60;
                var tiempoFormateado = minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0');
                elementoContador.textContent = tiempoFormateado;
                tiempoInicial--;
                if (tiempoInicial < 0) {
                    clearInterval(intervalo);
                    contadorIniciado = false;
                    brake = false; 
                    clock.addEventListener('click', iniciarContador);
                    startCountdown();
                }
            }, 1000);
        }, 1600);
        // Desvincula el evento de clic para evitar que se inicie nuevamente
        clock.removeEventListener('click', iniciarContador);
        counter.removeEventListener('click', iniciarContador);
    }else if (pausas == 4) {
        var tiempoInicial = 15 * 60;
        var elementoContador = document.getElementById('contador');
        timeToBreak()
        elementoContador.textContent = 'Break';
        pausas=0;
        musicaFondo.pause();
        setTimeout(function() {
            var intervalo = setInterval(function() {
                var minutos = Math.floor(tiempoInicial / 60);
                var segundos = tiempoInicial % 60;
                var tiempoFormateado = minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0');
                elementoContador.textContent = tiempoFormateado;
                tiempoInicial--;
                if (tiempoInicial < 0) {
                    clearInterval(intervalo);
                    contadorIniciado = false;
                    brake = false; // Restablece el contador iniciado a false cuando llega a cero
                    clock.addEventListener('click', iniciarContador);
                    startCountdown();
                }
            }, 1000);
        }, 1600);
        // Desvincula el evento de clic para evitar que se inicie nuevamente
        clock.removeEventListener('click', iniciarContador);
        counter.removeEventListener('click', iniciarContador);

    }
}

// Funcion para iniciar el contador
function iniciarContador() {
    startCountdown();
}

// Controla el timer al darle click al reloj
var clock = document.getElementById('clock');
clock.addEventListener('click', iniciarContador);
// Lo mismo pero para el reloj en dispositivos mas pequeños
var counter = document.getElementById('contador');
counter.addEventListener('click', iniciarContador);


//animacion de pulsar el boton del reloj

var imageC = document.getElementById('clock');

function clockBanimation() {
    setTimeout(function() {
        imageC.src = 'Image/clock-2.png';
    }, 50);

    setTimeout(function() {
        imageC.src = 'Image/clock.png';
    }, 700);
}

clock.addEventListener('click', clockBanimation);

counter.addEventListener('click', clockBanimation);

clock.addEventListener('click', ticFunction);

clock.addEventListener('click', startMusic);


// cambiar fondo y musica con la hora del cliente

function getBackground() {
    var container = document.querySelector('body');
    var horaActual = new Date().getHours();
    if (horaActual >= 7 && horaActual < 12) {
        container.classList.remove('dia');
        container.classList.remove('noche');
        container.classList.add('amanecer');       
    } else if (horaActual >= 12 && horaActual < 20) {
        container.classList.remove('noche');
        container.classList.remove('amanecer');
        container.classList.add('dia');        
    }else{
        container.classList.remove('dia');
        container.classList.remove('amanecer');
        container.classList.add('noche');    
    }
}

// cargar los cambios del backgorund

var updateBackground = setInterval(getBackground, 2000);


function reloadCSS() {
    var links = document.getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute('rel') === 'stylesheet') {
            var href = links[i].getAttribute('href') + '?v=' + new Date().getTime();
            links[i].setAttribute('href', href);
        }
    }
}

var updateCSS = setInterval(reloadCSS, 2000);