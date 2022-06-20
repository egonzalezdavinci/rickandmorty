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

if (localStorage.aFavoritos) {
    aFavoritos = JSON.parse(localStorage.aFavoritos);
} else {
    localStorage.aFavoritos = JSON.stringify(aFavoritos);
}

let mostrarContenidoCard = document.getElementById('contentPersonaje');

const APIMORTY = 'https://rickandmortyapi.com/graphql';

const queryMortyAndMarty = (contenido) => `query{
  characters(filter: { name: "${contenido}" }) {
    results {
	  id,
	  gender,
      name,
      image,
      species,
	  status
      episode{
        name
      }
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
	let a = json.characters.results;
	console.log(json);
	let cardPerdonaje = '';
	
		for (i = 0; i < a.length; i++) {
		
		console.log(a[i].name);
		cardPerdonaje += `
		<div class="col-sm-3">
				<div class="card">
				  <div class="card-body">
				    <img src="${a[i].image}" alt="${a[i].name}" class="card-img-top">
					<h2 class="card-title">${a[i].name}</h2>
					<p class="card-text">Especie: ${a[i].species}</p>
					<p class="card-text">Genero: ${a[i].gender}</p>
					<p class="card-text">Estado: ${a[i].status}</p>
					<button class="guardarPeronaje" data-cod="${a[i].id}" class="btn btn-primary">Guardar</button>
				  </div>
				</div>
			</div>`;
		mostrarContenidoCard.innerHTML = `${cardPerdonaje}`;

	}
	
	let cards = document.querySelectorAll('.guardarPeronaje');
	console.log(cards);
	
	for(i of cards){

			i.onclick = function(){
				let saveCod = this.dataset.cod;
				
				//preguntar si esxiste en el localStorage
				for(s = 0; s < aFavoritos.id.length; s++) {
					if(aFavoritos.id[s] == saveCod){
						alert('ya esta guardado');
						return;
					}else{
						alert('Podes guardarlo');
					}
				}
				
				for(i = 0; i < a.length; i++) {
					if( saveCod == a[i].id){
						
						console.log(saveCod);
						console.log(a[i].id);
						
						aFavoritos.id.push(saveCod);
						aFavoritos.genero.push(a[i].gender);
						aFavoritos.nombre.push(a[i].name);
						aFavoritos.imagen.push(a[i].image);
						aFavoritos.especie.push(a[i].species);	

						localStorage.aFavoritos = JSON.stringify(aFavoritos);
						
					}
				}
				
				
				
				
			}
	};

}