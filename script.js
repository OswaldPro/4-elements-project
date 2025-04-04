// Script pour page feu

if (window.location.href.includes('fire.html')) {
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

  // Ouverture de la modal pour le formulaire

  document.addEventListener("DOMContentLoaded", () => { //on execute quand le DOM est chargé
    fetch("modal.html") // on recupère le contenu de modal.html
    .then(response => response.text()) // on le transforme en texte
    .then(html => {
      document.getElementById("modalContainer").innerHTML = html; // on l'injecte dans le conteneur

      displayModal(); // Initialisation de la modal : on appelle la fonction qui contient de quoi afficher/cacher la modal      
    })
    .catch(error => {
      console.error("Erreur lors du chargement de modal.html :", error); // on affiche une erreur si ça ne marche pas
    });
  });

  function displayModal() {
    let modal = document.getElementById("modal");
    let closeBtn = document.querySelector(".close-modal");
    let openBtn = document.querySelectorAll(".open-modal");

    openBtn.forEach(btn => {
      btn.addEventListener("click", () => {
        modal.style.display = "flex"; // on affiche la modal
        document.getElementById("header").style.filter = "blur(5px)";
        document.getElementById("main").style.filter = "blur(5px)";
        document.getElementById("footer").style.filter = "blur(5px)";
      });
    });    

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none"; // on cache la modal
      document.getElementById("header").style.filter = "none";
      document.getElementById("main").style.filter = "none";
      document.getElementById("footer").style.filter = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) { // on vérifie si on clique en dehors de la modal
        modal.style.display = "none"; // on cache la modal si on clique en dehors
        document.getElementById("header").style.filter = "none";
        document.getElementById("main").style.filter = "none";
        document.getElementById("footer").style.filter = "none";
      }
    });
  }// fin script modal
} //fin du script hotel feu + de l'affichage de la modal

// Script pour le formulaire de la modal 

if (window.location.href.includes('modal.html')) {
  document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();

    //Recupération de la valeurs des inputs
    let lastName = document.getElementById("lastName").value.trim();
    let firstName = document.getElementById("firstName").value.trim();
    let address = document.getElementById("address").value.trim();
    let postalCode = document.getElementById("postal-code").value.trim();
    let city = document.getElementById("city").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();

    // Récupération des valeurs des radios
    let room = document.querySelector('input[name="room"]:checked') ? document.querySelector('input[name="room"]:checked').value : null;

    // Récupération de la valeur du select
    let persons = document.getElementById("persons").value;

    // Récupération des dates
    let arrival = document.getElementById("arrival").value;
    let departure = document.getElementById("departure").value;

    // Récupération des cases à cocher
    let chauffeur = document.querySelector('input[name="chauffeur"]:checked') ? 'oui' : 'non';
    let breakfast = document.querySelector('input[name="breakfast"]:checked') ? 'oui' : 'non';
    let meal = document.querySelector('input[name="meal"]:checked') ? 'oui' : 'non';
    let visit = document.querySelector('input[name="visit"]:checked') ? 'oui' : 'non';

    // Récupération des options de repas 
    let lunch = document.querySelector('input[name="lunch"]:checked') ? 'oui' : 'non';
    let dinner = document.querySelector('input[name="dinner"]:checked') ? 'oui' : 'non';
    let occasional = document.querySelector('input[name="occasional"]:checked') ? 'oui' : 'non';

    // Récupération du régime alimentaire
    let diet = document.querySelector('input[name="diet"]:checked') ? document.querySelector('input[name="diet"]:checked').value : null;

    // Récupération des restrictions alimentaires
    let glutenFree = document.querySelector('input[name="gluten-free"]:checked') ? 'oui' : 'non';
    let lactoseFree = document.querySelector('input[name="lactose-free"]:checked') ? 'oui' : 'non';
    let otherAllergies = document.querySelector('input[name="other-allergies"]').value.trim();

    //Déclaration des regex
    let regexName = /^[A-Za-zÀ-ÿ- ]{2,50}$/;
    let regexAdress = /^\d+\s[A-Za-zÀ-ÿ0-9\s,.-]{1,150}$/;
    let regexPostalCode = /^\d{4,5}$/;
    let regexCity = /^[A-Za-zÀ-ÿ- ]{2,50}$/;
    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/;
    let regexPhone = /^(0|\+33)[1-9](\d{2}){4}$/;

    // Vérifications des regex

    let errors = [];

    if (!regexName.test(firstName)) errors.push("Le prénom est incorrect");
    if (!regexName.test(lastName)) errors.push("Le nom est incorrect");
    if (!regexAdress.test(address)) errors.push("L'adresse est incorrecte");
    if (!regexPostalCode.test(postalCode)) errors.push("Le code postal est incorrect");
    if (!regexCity.test(city)) errors.push("La ville est incorrecte");
    if (!regexEmail.test(email)) errors.push("L'email est incorrect");
    if (!regexPhone.test(phone)) errors.push("Le numéro de téléphone est incorrect");

    // Vérifications des radio et checkbox

    if (!room) { errors.push("Vous devez choisir une chambre");}
    
    if (!persons || persons < 1) { errors.push("Veuillez renseigner le nombre de personnes.")}
    arrival = new Date(document.getElementById("arrival").value);
    departure = new Date(document.getElementById("departure").value);
    let today = new Date();

    // Vérifier que la date d'arrivée n'est pas dans le passé
    if (arrival <= today) {errors.push("La date d'arrivée doit être au minimum le lendemain.");}

    // Vérifier que la date de départ est après la date d'arrivée
    if (departure <= arrival) { errors.push("La date de départ doit être après la date d'arrivée.");}

    // Calcul du prix total 

    let oneDay = 24 * 60 * 60 * 1000;
    let nights = Math.round((departure - arrival) / oneDay);
    let total = 0;

    // Determination du prix de l'hotel selectionné
    if (room.value === "igloo") {total += 500 * nights;} 
    else if (room.value === "suite") {total += 850 * nights;}

    // Ajouts de options

    if (chauffeur.checked) { total += 11 * nights;}
    if (visit.checked) { total += 20;}
    if (breakfast.checked) { total += 15 * nights * persons.value;}
    if (meal.checked) { total += 15 * nights * persons.value;}
    if (lunch.checked) { total += 15 * nights * persons.value;}
    if (dinner.checked) { total += 15 * nights * persons.value;}
    




















  })
}



