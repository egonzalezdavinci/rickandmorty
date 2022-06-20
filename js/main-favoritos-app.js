let aFavoritos = {
	id:[],
	genero:[],
	nombre:[],
	imagen:[],
	especie:[]
};

if (localStorage.aFavoritos){
    aFavoritos = JSON.parse(localStorage.aFavoritos);
} else {
    localStorage.aFavoritos = JSON.stringify(aFavoritos);
}

let content_favirtos = document.getElementById('contentFavoritos');

function mostrarFavoritos(){
	let cardPersonaje = '';
	
		for (i = 0; i < aFavoritos.id.length; i++) {
		
		console.log(aFavoritos.nombre[i]);
		console.log(aFavoritos.especie[i]);
		cardPersonaje += `
		<div class="col-sm-3">
				<div class="card">
				  <div class="card-body">
				    <img src="${aFavoritos.imagen[i]}" alt="${aFavoritos.nombre[i]}" class="card-img-top">
					<h2 class="card-title">${aFavoritos.nombre[i]}</h2>
					<p class="card-text">${aFavoritos.especie[i]}</p>
					<p class="card-text">${aFavoritos.genero[i]}</p>
					<button class="quitarPeronaje" data-cod="${aFavoritos.id[i]}" class="btn btn-primary">Quitar</button>
				  </div>
				</div>
			</div>`;
		content_favirtos.innerHTML = `${cardPersonaje}`;
	}


let cards = document.querySelectorAll('.quitarPeronaje');
	console.log(cards);

	for(i of cards){

			i.onclick = function(){
				let saveCod = this.dataset.cod;
				alert(saveCod);
				
				for (s = 0; s < aFavoritos.id.length; s++) {
					
					if( saveCod == aFavoritos.id[s]){
						
						aFavoritos.id.splice(s,1);
						aFavoritos.genero.splice(s,1);
						aFavoritos.nombre.splice(s,1);
						aFavoritos.imagen.splice(s,1);
						aFavoritos.especie.splice(s,1);	
						
						let nodoPadre = this.parentNode;
						let nodoAbu = nodoPadre.parentNode;
						let nodoBisa = nodoAbu.parentNode;
							nodoBisa.remove();

						localStorage.aFavoritos = JSON.stringify(aFavoritos);
						
					}
				}
			}
	};

}


mostrarFavoritos();