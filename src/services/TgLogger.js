class Logger {
  constructeur(msg){
    this.msg = msg
  }
}
/*
get info() {

}

    class Rectangle {
      constructor(hauteur, largeur) {
        this.hauteur = hauteur;
        this.largeur = largeur;
      }

      get area() {
        return this.calcArea();
      }

      calcArea() {
        return this.largeur * this.hauteur;
      }
    }

    const carré = new Rectangle(10, 10);

    console.log(carré.area);
*/
/*
https://www.npmjs.com/package/js-logger
Logger.debug("I'm a debug message!");
Logger.info("OMG! Check this window out!", window);
Logger.warn("Purple Alert! Purple Alert!");
Logger.error("HOLY SHI... no carrier.");

Logger.INFO = defineLogLevel(3, 'INFO');
// Inner class which performs the bulk of the work; ContextualLogger instances can be configured independently
	// of each other.
	var ContextualLogger = function(defaultContext) {
		this.context = defaultContext;
		this.setLevel(defaultContext.filterLevel);
		this.log = this.info;  // Convenience alias.
	};
  ContextualLogger.prototype = {
    info: function () {
  			this.invoke(Logger.INFO, arguments);
  		},
      // Invokes the logger callback if it's not being filtered.
  		invoke: function (level, msgArgs) {
  			if (logHandler && this.enabledFor(level)) {
  				logHandler(msgArgs, merge({ level: level }, this.context));
  			}
  		}
  	};

    // Protected instance which all calls to the to level `Logger` module will be routed through.
  	var globalLogger = new ContextualLogger({ filterLevel: Logger.OFF });

  	// Configure the global Logger instance.
  	(function() {
  		// Shortcut for optimisers.
  		var L = Logger;
      L.info = bind(globalLogger, globalLogger.info);
      // Don't forget the convenience alias!
		L.log = L.info;
	}());

*/

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
*/
/*
Le constructeur Response() prend deux arguments optionnels —le corps de la réponse, et un objet d'options (similaire à l'objet que Request() accepte).

Les propriétés de réponse les plus communes que vous allez utiliser sont:

Response.status —Un entier (valeur par défaut 200) contenant le code de statut de la réponse.
Response.statusText — Une chaine de caractères (valeur par défaut "OK"), qui correspond au message du statut HTTP.
Response.ok —vu précedemment, c'est un raccourci pour vérifier que le code de statut et bien compris entre 200 et 299 inclus. Retourne un Boolean.
*/

module.export = Logger
