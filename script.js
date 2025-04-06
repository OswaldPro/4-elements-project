if (window.location.href.includes('index.html')) {
  // Sélectionne tous les carrousels
  let hotelPics = document.querySelectorAll('.hotel-pics');
  let nextBtns = document.querySelectorAll('.first-pic');
  let prevBtns = document.querySelectorAll('.second-pic');

  hotelPics.forEach((hotelPic, index) => {
    let nextBtn = nextBtns[index]; // Associer le bon bouton au bon carrousel
    let prevBtn = prevBtns[index];

    nextBtn.onclick = function() {
      hotelPic.append(hotelPic.querySelector('div:first-child'));
    }

    prevBtn.onclick = function() {
      hotelPic.prepend(hotelPic.querySelector('div:last-child'));
    }
  });
}










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
      initModal(); // on appelle la fonction qui initialise le formulaire de la modal  
      initRecap();  
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
  }

  function initModal() {

    // Affichage des options repas 
    document.getElementById("meal").addEventListener('change', () => {
      let mealOptions = document.getElementById("mealOptions");
      let dietOptions = document.getElementById("dietOptions");
      if (document.getElementById("meal").checked) {
        mealOptions.style.display = "flex";
        dietOptions.style.display = "block";
        
      } else {
        mealOptions.style.display = "none";
        dietOptions.style.display = "none";
      }
    });
  }

//fin du script hotel feu + de l'affichage de la modal

// Script pour le formulaire de la modal 


  function initRecap() {
    const form = document.getElementById("form");
    const recap = document.getElementById("recap");

  
    form.addEventListener("submit", function(e) {
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
      let chauffeur = document.getElementById("chauffeur") 
      let breakfast = document.getElementById("breakfast") 
      let meal = document.getElementById("meal")
      let visit = document.getElementById("visit")

      // Récupération des options de repas 
      let lunch = document.getElementById("lunch") 
      let dinner = document.getElementById("dinner") 
      let occasional = document.getElementById("occasional") 

      // Récupération du régime alimentaire
      let diet = document.querySelector('input[name="diet"]:checked') ? document.querySelector('input[name="diet"]:checked').value : null;


      // Récupération des restrictions alimentaires
      let glutenFree = document.querySelector('input[name="gluten-free"]') 
      let lactoseFree = document.querySelector('input[name="lactose-free"]') 
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
      if (room === "igloo") {total += 500 * nights;} 
      else if (room === "suite") {total += 850 * nights;}

      // Ajouts de options

      if (chauffeur.checked) { total += 11 * nights;}
      if (visit.checked) { total += 20;}
      if (breakfast.checked) { total += 15 * nights * persons;}
      if (meal.checked) { total += 15 * nights * persons;}
      if (lunch.checked) { total += 15 * nights * persons;}
      if (dinner.checked) { total += 15 * nights * persons;}

      // on affiche le récapitulatif ou les erreurs
      let recap = document.getElementById("recap");
      console.log(errors);
      if (errors.length > 0) {
        alert(errors.join("\n"));
        return; // Stop ici si erreur
      } else {
        console.log("Pas d'erreurs)")
        recap.style.display = "flex";
        recap.innerHTML = `
        <h3>Récapitulatif de votre réservation</h3>
        <p><strong>Nom :</strong> ${lastName}</p>
        <p><strong>Prénom :</strong> ${firstName}</p>
        <p><strong>Adresse :</strong> ${address}</p>
        <p><strong>Code postal :</strong> ${postalCode}</p>
        <p><strong>Ville :</strong> ${city}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Chambre :</strong> ${room}</p>
        <p><strong>Nombre de personnes :</strong> ${persons}</p>
        <p><strong>Date d'arrivée :</strong> ${arrival.toLocaleDateString()}</p>
        <p><strong>Date de départ :</strong> ${departure.toLocaleDateString()}</p>
        <p><strong>Total : </strong>${total} €</p>
        <button onclick="closeRecap()" class="secondary-btn>Fermer</button>`;
      }
    })
  };
}



