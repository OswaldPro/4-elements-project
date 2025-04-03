// Script pour page feu

if (window.location.pathname.includes('fire.html')) {
  // Sélectionne tous les carrousels
  let carousels = document.querySelectorAll('.carousel');
  let nextBtns = document.querySelectorAll('.next');
  let prevBtns = document.querySelectorAll('.prev');

  carousels.forEach((carousel, index) => {
    let nextBtn = nextBtns[index]; // Associer le bon bouton au bon carrousel
    let prevBtn = prevBtns[index];

    nextBtn.onclick = function() {
      carousel.append(carousel.querySelector('div:first-child'));
    }

    prevBtn.onclick = function() {
      carousel.prepend(carousel.querySelector('div:last-child'));
    }
  });

  // Ajoute du style au lien actif dans le header 
  let linkFire = document.querySelector('.link-fire');

  linkFire.classList.add('active-link');

}