var locations = ["Seattle", "Washington DC", "Chicago", "Charleston", "Philadelphia", "New York", "Los Angeles", "St. Louis", "Baltimore", "Dallas", "Missoula", "Denver", "Tulsa", "New Orleans", "Albequerque", "Las Vegas"];
var foes = ["aliens", "the flukeman", "the Mothman", "Chupacabra", "bigfoot", "the Loch Ness Monster", "a werewolf", "ghosts", "zombie neighbors"];
var instances = ["1913", "1895", "1954", "1972", "1984", "1900", "1995"];
var clues = ["photograph", "transcript", "handwritten note", "phone call", " police report", "newspaper article", "secret meeting", "e-mail", "confidential file"];
var contacts = ["the local Sheriff", "The Lone Gunmen", "Informant X", "Walter Skinner", "FBI Crime Lab", "Deep Throat", "Alex Krycek", "The Smoking Man"];
var items = ["book", "", "shield", "", "medkit", "", "flask", "MIB", "rocket", ""];
var foe;
var contact;
var clue;
var city;
var health;
var complete;

//constructors
function Investigate() {
  complete += Math.floor(Math.random() *10);
  $('.logbook').append("<p><h4>You are hot on the trail, but " + foe + " still elude you. Your case is now " + complete + "% complete.</h4></p>");
    xFiles.mission.ambush(xFiles.foe);
    $('.fa-meh-o').removeClass('show');
    $('.fa-frown-o').removeClass('show');
      console.log("health", health);
    if (health > 72) {
      console.log("your health is good");
      $('.fa-smile-o').addClass('show');
    } else if ( health > 31) {
      $('.fa-meh-o').addClass('show');
      $('.fa-smile-o').removeClass('show');
      $('.fa-frown-o').removeClass('show');
      console.log("your health is ok");
    } else if ( health >= 1) {
      $('.fa-meh-o').removeClass('show');
      $('.fa-frown-o').addClass('show');
      $('.fa-smile-o').removeClass('show');
      console.log("your health is poor");
    } else {
      console.log("you dead");
      $('.logbook').append("<p>The Monster has killed you! GAME OVER!</p>");
      $('.investigate').hide();
      $('.follow').hide();
      $('.fa-times-circle').addClass('show');
      $('.fa-frown-o').removeClass('show');
      $('.fa-smile-o').removeClass('show');
      $('.fa-meh-o').removeClass('show');
  }
};

function Clue() {
  this.clue = clues[Math.floor(Math.random() * clues.length)];
  this.contact = contacts[Math.floor(Math.random() * contacts.length)];
  this.inventory = items[Math.floor(Math.random() * items.length)];
  if (this.inventory === "MIB") {
    complete -= 10;
    $('.logbook').append("<p><h4>The Men in Black are on your trail. MIB have been added you your inventory. You are forced to stop investigating until they leave. Your case is now " +  complete + "% complete.</h4></p>");
    $('.fa-user-secret').addClass('show');
  } else if (this.inventory === "book") {
    $('.logbook').append("<p><h4>You receive a book related to the case. It has been added to your inventory.</h4></p>");
    $('.fa-book').addClass('show');
  } else if (this.inventory === "medkit") {
    $('.logbook').append("<p><h4>You receive a medkit. It is added to your inventory. Click on it at any time to increase your health.</h4></p>");
    $('.fa-medkit').addClass('show');
  } else if (this.inventory === "flask") {
    complete += 5;
    $('.logbook').append("<p><h4>You receive a lab report with additional evidence. Your case is now" + complete + "% completed.</h4></p>");
    $('.fa-flask').addClass('show');
  } else if (this.inventory === "rocket") {
    $('.logbook').append("<p><h4>You stumble across an unidentified vessel. It has been added to your inventory.</h4></p>");
    $('.fa-rocket').addClass('show');
  } else {
  };
  var update = Math.floor(Math.random() * 20);
  complete = update + complete;
  $('.logbook').append("<p>You receive a " + this.clue +" from " + this.contact + "")
  $('.logbook').append("<p><h4>With the new piece of evidence, your case is " + complete + " % solved.</h4></p>");
  if (complete >= 100) {
    $('.logbook').append("<p>YOU SOLVED THE CASE! CONGRATULATIONS!");
  } else if (complete > 50) {
    $('.logbook').append("<p>Keep up the good work! </p>");
  } else {
    $('.logbook').append("<p>You still have a lot of work to do! Keep going! </p>");
  }
};

function Critter(){
  this.foe = foes[Math.floor(Math.random() * foes.length)];
  foe = this.foe;
};

function Mission() {
  health = 100;
  complete = 0;
  this.city = locations[Math.floor(Math.random() * locations.length)]; //randomly picks location from array
  this.instance = instances[Math.floor(Math.random() * instances.length)];
  $('.top').prepend("<p><h3>You are reviewing a file from " + this.city + " where local authorities have received reports of " + foe + ". Also contained within the file are records of similar instances in the region dating back to " + this.instance + ".</h3></p>");
  this.ambush = function(foe) {
    var damage = Math.floor(Math.random() *30);
    $('.logbook').append("<p>While following the trail, someone or something attacks!</p>");
    health -= damage;
    $('.logbook').append("<p><h4>Your health has dropped to " + health + "%. </h4></p>");
  };

  };


  var xFiles = {
    init: function() {
      xFiles.initEvents();
    },
    initStyling: function() {

    },
    initEvents: function() {
        $('#start').on('submit', function(event) {
          event.preventDefault();
          xFiles.foe = new Critter();
          xFiles.mission = new Mission();
          xFiles.renderGame();
        });

        $('.continue').on('click', function(event){
          event.preventDefault();
          $('.logbook').append("<p>Case Accepted. We hope to resolve this case before anyone else goes missing.</p>");
          $('.logbook').append("<p><h4>X-File added to inventory</h4><p>");
          $('.fa-file-excel-o').addClass('show');
          $('.logbook').append("<p>Your health is currently at 100%</p>");
          $('.fa-smile-o').addClass('show');
          $('.continue').hide();
          $('.another').hide();
          $('.query').hide();
          $('.investigate').addClass('show');
        });

        $('.another').on('click', function(event){
          $('.top h3').remove();
          xFiles.foe = new Critter();
          xFiles.mission = new Mission();
        });

        $('.investigate').on('click', function(event){
          event.preventDefault();
          xFiles.clue = new Clue();
          $('.follow').addClass('show');
        });
        $('.follow').on('click', function(event){
          event.preventDefault();
          xFiles.follow = new Investigate();
        });

        $('.fa-medkit').on('click', function(event){
          health += 30;
          $('.logbook').append("<p><h4>You have used your Medkit and added 30 to your health.<h4></p>");
          $('.fa-medkit').removeClass('show');
        });
    },
    renderGame: function() {
      $('.enter').removeClass('show');
      $('.main').addClass('show');

    }
  };//end xFiles methods

  $(document).ready(function(){
    xFiles.init();
  });
  //xFiles.foe.defense(damage);foes defense against our damage







  // if (foe === foes[0]) {
  //   $('.logbook').append("<p> You follow the evidence disclosed in the" + clue + " into the woods. You are distracted be something partially covered by branches and leaves. An unidentified vessel has been added to your inventory.</p>");
  //   health -=30;
  //     $('.logbook').append("<p>Initial evaluation of the site indicate hight levels of radiation. You have been exposed and lose 30 health.</p>");
  //     $('.fa-rocket').addClass('show');
  //   }else if (foe === foes[1]){
  //     $('.logbook').append("<p> You pursue your attacker through the field. It gets away. You take no further damage and you find a medkit.</p>");
  //     $('.fa-medkit').addClass('show');
  //     $('.logbook').append("<p>A medkit has been added to your inventory.</p>");
  //   }else if (foe === foes[2]){
  //   }else if (foe === foes[3]){
  //     health-=15;
  //   }else if (foe === foes[4]){
  //     health-=30;
  //     $('.fa-medkit').addClass('show');
  //     $('.logbook').append("<p>A medkit has been added to your inventory.</p>");
  //   }else if (foe === foes[5]){
  //     $('.fa-medkit').addClass('show');
  //     $('.logbook').append("<p>A medkit has been added to your inventory.</p>");
  //     health -=10;
  //   }else if (foe === foes[6]){
  //     health -=20;
  //   }else if (foe === foes[7]){
  //     health -=0;
  //     $('.fa-medkit').addClass('show');
  //     $('.logbook').append("<p>A medkit has been added to your inventory.</p>");
  //   }else if (foe === foes[8]){
  //     health -=30;
  //   }





  // //health constructor
  // function Health() {
  //   $('.fa-meh-o').removeClass('show');
  //   $('.fa-frown-o').removeClass('show');
  //   console.log("health", health);
  //   if (health > 69) {
  //     $('.fa-smile-o').addClass('show');
  //   }else if (30 < health < 70) {
  //     $('.fa-meh-o').addClass('show');
  //     $('.fa-smile-o').removeClass('show');
  //     $('.fa-frown-o').removeClass('show');
  //   }else if (30 < health > 0){
  //     $('.fa-frown-o').addClass('show');
  //     $('.fa-smile-o').removeClass('show');
  //     $('.fa-meh-o').removeClass('show');
  //   }else if (health <= 0) {
  //     $('.fa-times-circle').addClass('show');
  //     $('.fa-frown-o').removeClass('show');
  //     $('.fa-smile-o').removeClass('show');
  //     $('.fa-meh-o').removeClass('show');
  //   }
  //
  // };
