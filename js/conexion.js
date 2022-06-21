let tagBodyMensaje = document.getElementsByTagName('body')[0];
let contentMessageOffline = document.createElement('div');
let messageOffline = document.createElement('div');
	messageOffline.className = 'alert alert-danger';
	messageOffline.innerHTML = 'Sin conexión';

window.addEventListener('offline', event => {
    console.log('Estoy Offline!!');
    contentMessageOffline.className = 'contentMessage';
    tagBodyMensaje.appendChild(contentMessageOffline);
    contentMessageOffline.appendChild(messageOffline);
    setTimeout(function(){
        contentMessageOffline.removeChild(messageOffline);
        tagBodyMensaje.removeChild(contentMessageOffline);
        },5000);
})
window.addEventListener('online', event => {
    console.log('Estoy online!!');

});

if (!navigator.onLine){
    console.log('Estoy sin conexion, rey!');
    contentMessageOffline.className = 'contentMessage';
    tagBodyMensaje.appendChild(contentMessageOffline);
    contentMessageOffline.appendChild(messageOffline);
    setTimeout(function(){
        contentMessageOffline.removeChild(messageOffline);
        tagBodyMensaje.removeChild(contentMessageOffline);
        },5000);
}