var textarea = document.querySelector('textarea');

textarea.addEventListener('keydown', function(event) {
  // Otteniamo il valore del tasto premuto
  var key = event.key;
  
  // Controlliamo se il tasto premuto è uno di quelli che vogliamo bloccare
  if (key === '.' || key === '/' || key === '&' || key === '$' || key === '[' || key === ']') {
    // Preveniamo l'input dell'utente
    event.preventDefault();
  }
});
