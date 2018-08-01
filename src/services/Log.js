
log404: function () {
  // recupérer les 404 de la page error: 404, msg: url 
}

logRequest: function () {
  // intercepter les requêtes envoyées request : url, status : status-code, response: msg
}

logMsg: function (msg) {
  // Afficher à l'écran le message envoyé 
}

logMail: function (msg) {
  // Envoyer un email à l'admin contenant le message d'erreur
}

logStorage: function (error) {
  // Enregistre l'erreur sur le serveur/fichier de log
}

var myBody = new Blob(),

/*
Une promesse fetch() va retourner une TypeError quand un problème réseau s'est produit. Cependant, il peut aussi s'agir d'un problème de permission ou quelque chose de similaire — un code HTTP 404 ne constitue pas une erreur réseau, par exemple. Un bon test de la réussite de fetch() devrait inclure la vérification que la promesse soit résolue, puis vérifier que la propriété Response.ok ait la valeur true. Le code devrait ressembler à ce qui suit:

fetch('flowers.jpg').then(function(response) {
  if(response.ok) {
    response.blob().then(function(myBlob) {
      var objectURL = URL.createObjectURL(myBlob);
      myImage.src = objectURL;
    });
  } else {
    console.log('Mauvaise réponse du réseau');
  }
})
.catch(function(error) {
  console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
});
*/

addEventListener('fetch', function(event) {
  event.respondWith(new Response(myBody, {
    headers: { "Content-Type" : "text/plain" }
  });
)});

addEventListener('getJSON', function(event) {
  event.respondWith(new Response(myBody, {
    headers: { "Content-Type" : "text/plain" }
  });
)});
/*
Le constructeur Response() prend deux arguments optionnels —le corps de la réponse, et un objet d'options (similaire à l'objet que Request() accepte).

Les propriétés de réponse les plus communes que vous allez utiliser sont:

Response.status —Un entier (valeur par défaut 200) contenant le code de statut de la réponse.
Response.statusText — Une chaine de caractères (valeur par défaut "OK"), qui correspond au message du statut HTTP.
Response.ok —vu précedemment, c'est un raccourci pour vérifier que le code de statut et bien compris entre 200 et 299 inclus. Retourne un Boolean.
*/



module.export = log404