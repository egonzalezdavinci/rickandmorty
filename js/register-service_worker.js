if ('serviceWorker' in navigator){
  navigator.serviceWorker.register("./service_worker.js").then((message) => {
    console.log("Service funciona!");
  });
} else {
  console.log('No funciona');
}