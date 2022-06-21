window.addEventListener('offline', event => {
    console.log('Estoy Offline!!');
})
window.addEventListener('online', event => {
    console.log('Estoy online!!');
})
if (!navigator.onLine){
    console.log('Estoy sin conexion, rey!');
}

let input_buscador = document.getElementById('buscador');
let btn_buscador = document.querySelector('.buscar_btn');
let content_buscador = document.querySelector('.main_buscador');
let mostrarContenidoCard = document.getElementById('contentPersonaje');
let contentSpinner = document.createElement('div');
    contentSpinner.className = 'contentSpinner';
let spinner = document.createElement('img');
    spinner.src = 'imagenes/spinner.gif';
    spinner.alt = 'Cargando ...';
    spinner.className = 'spinner';

let aFavoritos = {
	id:[],
	genero:[],
	nombre:[],
	imagen:[],
	especie:[]
};

const queryMortyAndMarty = (contenido) => `query {
  episodes(filter: { name: "${contenido}" }) {
    results{
      id
      name
      episode
      created
	  air_date
    }
  }
}`

btn_buscador.addEventListener('click', ()=>{
    mostrarContenidoCard.innerHTML = ``;
    mostrarContenidoCard.appendChild(contentSpinner);
    contentSpinner.appendChild(spinner);

    let contenido = input_buscador.value;

    const option = {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            query: queryMortyAndMarty(contenido)
        })
    }

    fetch('https://rickandmortyapi.com/graphql',option)
	.then(function(response){
            console.log('resnponse cruda', response);
			return response.json();
    }).then(function(json){
		
        //mostrarContenidoCard.innerHTML = JSON.stringify(json.data);
		mostrarPersonajes(json.data);
    }).finally(function(){
        //poner un loading
    }).catch(function(err){
           console.log("Algo falló", err);
    });
});


function mostrarPersonajes(json){
	let a = json.episodes.results;
	console.log(json);
	let cardPerdonaje = '';
    contentSpinner.removeChild(spinner);
    mostrarContenidoCard.removeChild(contentSpinner);
	
		for (i = 0; i < a.length; i++) {
		
		console.log(a[i].name);
		cardPerdonaje += `
		<div class="col-sm-3">
				<div class="card">
  					<div class="card-header">${a[i].name}</div>
  					<div class="card-body">
    				<h3 class="card-title">${a[i].episode}</h3>
    				<p class="card-text">${a[i].created}</p>
    				<p class="card-text">${a[i].air_date}</p>
    				</div>
  				</div>
		</div>`;
		mostrarContenidoCard.innerHTML = `${cardPerdonaje}`;
	}
}