let tagBodyMensaje = document.getElementsByTagName('body')[0];
let contentMessageOffline = document.createElement('div');
let messageOffline = document.createElement('div');
	contentMessageOffline.className = 'contentMessage';
	messageOffline.className = 'alert alert-danger';
	messageOffline.innerHTML = 'Sin conexión';

window.addEventListener('offline', event => {
    console.log('Estoy Offline!!');
    tagBodyMensaje.appendChild(contentMessageOffline);
    contentMessageOffline.appendChild(messageOffline);
})
window.addEventListener('online', event => {
    console.log('Estoy online!!');
    messageOffline = '';
});

if (!navigator.onLine){
    console.log('Estoy sin conexion, rey!');
    alert("No estas conectado");
    tagBodyMensaje.appendChild(contentMessageOffline);
    contentMessageOffline.appendChild(messageOffline);
}