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

let aFavoritos = {
	id:[],
	genero:[],
	nombre:[],
	imagen:[],
	especie:[]
};


let mostrarContenidoCard = document.getElementById('contentPersonaje');

const APIMORTY = 'https://rickandmortyapi.com/graphql';

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
	
		for (i = 0; i < a.length; i++) {
		
		console.log(a[i].name);
		cardPerdonaje += `
		<div class="col-sm-3">
				<div class="card">
				  <div class="card-body">
					<h2 class="card-title">${a[i].name}</h2>
					<p class="card-text">${a[i].episode}</p>
					<p class="card-text">${a[i].created}</p>
					<p class="card-text">${a[i].air_date}</p>
				  </div>
				</div>
			</div>`;
		mostrarContenidoCard.innerHTML = `${cardPerdonaje}`;

	}
}