//Variables
const formulario = document.getElementById("formulario");
const listaTweets = document.getElementById("lista-tweets");

let tweets = [];

//Events Listeners
eventListeners();

function eventListeners() {
    //CUANDO EL USUARIO AGREGA UN NUEVO TWEET
  formulario.addEventListener("submit", agregarTweet);

  //CUANDO EL DOCUMENTO ESTA LISTO
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('llaveTweet')) || [];
    console.log(tweets)
    crearHtml()
  })
}

//Funciones

function agregarTweet(e) {
  e.preventDefault();
  //text area donde el usuario escribe
  const tweet = document.getElementById("tweet").value;

  if(tweet == ""){
    mostrarError("un mensaje no puede ir vacio")
    return;
    }
    
    //crear el objeto para añadir al array
    const tweetObj = {
        id: Date.now(),
        texto: tweet
    }
   //añadir al array los tweets
   tweets = [...tweets,tweetObj] 
   //crear el html
   crearHtml()

   //reiniciar el formulario
   formulario.reset();
}


//MOstrar mensaje error.. el parametro errror es el texto de la func de arriba
function mostrarError(error) {
    const mensajeEerror = document.createElement('p');
    mensajeEerror.textContent = error;
    mensajeEerror.classList.add('error');
    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeEerror);

    setTimeout(()=>{
        mensajeEerror.remove()
    },1500)
}


//muestra un listado de los tweets
function crearHtml(){
    limpiarHtml()
    //si tweets el array tiene algo, si no esta vacio..
    if(tweets.length > 0){
        tweets.forEach( tweet => {
            //agregar un boton X
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            //Añadir la func de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

           //creo el html
        const li = document.createElement("li");
        li.innerText= tweet.texto
        //insertarlo en el html
        listaTweets.appendChild(li);
        li.appendChild(btnEliminar);
        });
    }

    sincronizarStorage()
}

//limpiar HTML
function limpiarHtml(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
    
}

//borrar tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id)

    crearHtml()
}

//Agrega los tweets actuales al local storage setItem
function sincronizarStorage() {
    localStorage.setItem('llaveTweet',JSON.stringify(tweets))
}


