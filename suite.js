/* Script commun aux pages de la suite (accueil, review, todo).
   Il ne fait que trois choses, et la page marche sans lui :
   - lire le nom et l'adresse mail dans config.json (une seule source) ;
   - faire défiler les noms d'outils dans l'adresse de l'accueil ;
   - respecter prefers-reduced-motion. */
(function () {
  var script = document.currentScript;
  var base = script ? script.src.replace(/[^/]*$/, '') : '';

  fetch(base + 'config.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .catch(function () { return null; })
    .then(function (c) {
      if (!c) return;
      var nom = document.getElementById('js-nom');
      var pied = document.getElementById('js-nom-pied');
      if (c.nom && nom) nom.textContent = c.nom;
      if (c.nom && pied) pied.textContent = c.nom;
      if (c.email) {
        [].forEach.call(document.querySelectorAll('a[data-mail]'), function (a) {
          a.href = 'mailto:' + c.email + '?subject=' + encodeURIComponent(a.getAttribute('data-mail'));
        });
      }
    });

  var mot = document.getElementById('js-outil');
  if (mot && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    var noms = ['portfolio', 'review', 'todo'], i = 0;
    setInterval(function () { i = (i + 1) % noms.length; mot.textContent = noms[i]; }, 2600);
  }
})();
