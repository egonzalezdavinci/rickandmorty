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

if (localStorage.aFavoritos) {
    aFavoritos = JSON.parse(localStorage.aFavoritos);
} else {
    localStorage.aFavoritos = JSON.stringify(aFavoritos);
}

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
	let a = json.characters.results;
	console.log(json);
	let cardPerdonaje = '';
	contentSpinner.removeChild(spinner);
	mostrarContenidoCard.removeChild(contentSpinner);
	
	
		for (i = 0; i < a.length; i++) {
		let existePersonaje = 0;
		console.log(a[i].name);
		cardPerdonaje += `
		<div class="col-sm-3">
				<div class="card">
				  <div class="card-body">
				    <img src="${a[i].image}" alt="${a[i].name}" class="card-img-top">
					<h2 class="card-title mb-1">${a[i].name}</h2>
					<p class="card-text mb-1">Especie: ${a[i].species}</p>
					<p class="card-text mb-1">Genero: ${a[i].gender}</p>
					<p class="card-text">Estado: ${a[i].status}</p>`;
		//preguntar si existe, si es asi cambiar el botón
		for(s = 0; s < aFavoritos.id.length; s++) {
					if(aFavoritos.id[s] == a[i].id){
						existePersonaje = 1;
						console.log(aFavoritos.id[s]);
						console.log(a[i].id);
					}
			}

			if(existePersonaje == 0){
				cardPerdonaje += `<button class="guardarPeronaje" data-cod="${a[i].id}" >Guardar</button>`;
			}else{
				cardPerdonaje += `<button class="guardarPeronaje" data-cod="${a[i].id}" >Quitar</button>`;
			}

		cardPerdonaje +=`</div>
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

						aFavoritos.id.splice(s,1);
						aFavoritos.genero.splice(s,1);
						aFavoritos.nombre.splice(s,1);
						aFavoritos.imagen.splice(s,1);
						aFavoritos.especie.splice(s,1);	

						localStorage.aFavoritos = JSON.stringify(aFavoritos);
						this.className = "guardarPeronaje";
						this.innerHTML = "Guardar";
						return;
					}
				}
				
				for(j = 0; j < a.length; j++) {
					if( saveCod == a[j].id){
						
						console.log(saveCod);
						console.log(a[j].id);
						
						aFavoritos.id.push(saveCod);
						aFavoritos.genero.push(a[j].gender);
						aFavoritos.nombre.push(a[j].name);
						aFavoritos.imagen.push(a[j].image);
						aFavoritos.especie.push(a[j].species);	

						localStorage.aFavoritos = JSON.stringify(aFavoritos);
						
					}
				}
				this.className = "guardarPeronaje desabilitado";
				this.innerHTML = "Quitar";
	
			}
	};

}