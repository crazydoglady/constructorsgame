var locations = ["Seattle", "Washington DC", "Chicago", "Charleston", "Philadelphia", "New York", "Los Angeles", "St. Louis", "Baltimore", "Dallas", "Missoula", "Denver", "Tulsa", "New Orleans", "Albequerque", "Las Vegas"];
var foes = ["aliens", "crop circles", "the Mothman", "Chupacabra", "bigfoot", "the Loch Ness Monster", "a werewolf", "ghosts", "zombie neighbors"];
var instances = ["1913", "1895", "1954", "1972", "1984", "1900", "1995"];
var clues = ["photograph", "transcript", "handwritten note", "phone call", " police report", "newspaper article"];
var contacts = ["the local Sheriff", "The Lone Gunmen", "Informant X", "Walter Skinner", "FBI Crime Lab"];
var foe;
var contact;
var clue;
var city;
var health = 100;


//constructors
function Evidence() {
    clue = clues[Math.floor(Math.random() * clues.length)];
    contact = contacts[Math.floor(Math.random() * contacts.length)];
    $('.logbook').append("<p>You receive a " + clue +" from " + contact + "")
};

function Investigate() {
  if (foe === foes[0]) {
    $('.logbook').append("<p> You follow the evidence disclosed in the" + clue + " into the woods. You are distracted be something partially covered by branches and leaves. An unidentified vessel has been added to your inventory.</p>");
    health -=30;
      $('.logbook').append("<p>Initial evaluation of the site indicate hight levels of radiation. You have been exposed and lose 30 health.</p>");
      $('.fa-rocket').addClass('show');
      xFiles.health = new Health() ;
    }else if (foe === foes[1]){
      $('.logbook').append("<p> You pursue your attacker through the field. It gets away. You take no further damage and you find a medkit.</p>");
      $('.fa-medkit').addClass('show');
      $('.logbook').append("<p>A medkit has been added to your inventory.</p>");
      xFiles.health = new Health() ;
    }else if (foe === foes[2]){
      xFiles.health = new Health() ;
    }else if (foe === foes[3]){
      health-=15;
      xFiles.health = new Health() ;
    }else if (foe === foes[4]){
      health-=30;
      $('.fa-medkit').addClass('show');
      $('.logbook').append("<p>A medkit has been added to your inventory.</p>");
      xFiles.health = new Health() ;
    }else if (foe === foes[5]){
      $('.fa-medkit').addClass('show');
      $('.logbook').append("<p>A medkit has been added to your inventory.</p>");
      health -=10;
      xFiles.health = new Health() ;
    }else if (foe === foes[6]){
      health -=20;
      xFiles.health = new Health() ;
    }else if (foe === foes[7]){
      health -=0;
      $('.fa-medkit').addClass('show');
      $('.logbook').append("<p>A medkit has been added to your inventory.</p>");
      xFiles.health = new Health() ;
    }else if (foe === foes[8]){
      health -=30;
      xFiles.health = new Health() ;
    }
  };

  //health constructor
  function Health() {
    $('.fa-meh-o').removeClass('show');
    $('.fa-frown-o').removeClass('show');
    console.log("health", health);
    if (health > 69) {
      $('.fa-smile-o').addClass('show');
    }else if (30 < health < 70) {
      $('.fa-meh-o').addClass('show');
      $('.fa-smile-o').removeClass('show');
      $('.fa-frown-o').removeClass('show');
    }else if (30 < health > 0){
      $('.fa-frown-o').addClass('show');
      $('.fa-smile-o').removeClass('show');
      $('.fa-meh-o').removeClass('show');
    }else if (0 > health) {
      $('.fa-times-circle').addClass('show');
      $('.fa-frown-o').removeClass('show');
      $('.fa-smile-o').removeClass('show');
      $('.fa-meh-o').removeClass('show');
    }

  };



function Critter(){
  this.foe = foe;
  this.life = Math.floor(Math.random() * 50);
  foe = foes[Math.floor(Math.random() * foes.length)]; //randomly picks a monster from array
  console.log(foe);
  // this.strength = function (damage) {
  //   if (this.life >= 50) {
  //     xFiles.mission.ambush();
  //   }
  // }
};


function Mission() {
  health = 100;
  this.city = locations[Math.floor(Math.random() * locations.length)]; //randomly picks location from array
  this.instance = instances[Math.floor(Math.random() * instances.length)];
  $('.top').prepend("<p><h3>You are reviewing a file from " + this.city + " where local authorities have received reports of " + foe + ". Also contained within the file are records of similar instances in the region dating back to " + this.instance + ".</h3></p>");
  this.ambush = function(foe) {
    var damage = Math.floor(Math.random() *20);
    $('.logbook').append("<p>While investigating the most recent occurence, something came out of the nearby woods and attacked.</p>");
    health -= damage;
    $('.logbook').append("<p> Your health has dropped to " + health + "%. </p>");
    xFiles.health = new Health();
    $('.investigate').addClass('show');
    $('.abandon').addClass('show');
  };
  };

var xFiles = {
  init: function() {
    xFiles.initEvents();
    xFiles.health = new Health();
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
        $('.logbook').append("<p>X-File added to inventory<p>");
        $('.fa-file-excel-o').addClass('show');
        $('.logbook').append("<p>Your health is currently at 100%</p>");
        $('.fa-smile-o').addClass('show');
        $('.continue').hide();
        $('.another').hide();
        $('.query').hide();
        xFiles.health = new Health();
        xFiles.mission.ambush(xFiles.foe);
      });

      $('.another').on('click', function(event){
        $('.top h3').remove();
        xFiles.foe = new Critter();
        xFiles.mission = new Mission();
      });

      $('.investigate').on('click', function(event){
        event.preventDefault();
        xFiles.clue = new Evidence();
        $('.investigate').removeClass('show');
        $('.follow').addClass('show');
      });
      $('.follow').on('click', function(event){
        event.preventDefault();
        xFiles.clue = new Investigate();
        $('.follow').removeClass('show');
      });

      $('.fa-medkit').on('click', function(event){
        health += 30;
        $('.logbook').append("<p>You have used your Medkit and added 30 to your health.</p>");
        $('.fa-medkit').removeClass('show');
        xFiles.clue = new Health();
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
