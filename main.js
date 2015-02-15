var locations = ["Seattle", "Washington DC", "Chicago", "Charleston", "Philadelphia", "New York", "Los Angeles", "St. Louis", "Baltimore", "Dallas", "Missoula", "Denver", "Tulsa", "New Orleans", "Albequerque", "Las Vegas"];
var foes = ["aliens", "UFOs", "satellite interference", "little green men", "the Mothman", "jackelope", "Chupacabra", "bright flashes of light", "bigfoot", "the Loch Ness Monster", "a werewolf", "ghosts"];
var instances = ["1913", "1895", "1954", "1972", "1984", "1900", "1995"];
var clues = ["photograph", "transcript", "handwritten note", "anonymous phonecall", "police report"];
//mission constructor
function Characters() {
  this.name = "Dana Scully and Fox Mulder";
  this.life = 100;
}



function Mission() {
  this.city = locations[Math.floor(Math.random() * locations.length)]; //randomly picks location from array
  this.foe = foes[Math.floor(Math.random() * foes.length)]; //randomly picks a monster from array
  this.instance = instances[Math.floor(Math.random() * instances.length)];

  $('.logbook ul').append("We have been sent to " + this.city + " after recent reports of " + this.foe + " in the area and a few unexplained disappearances. Mulder looked through his files and found records of strangely similar circumstances dating back to " + this.instance + ". We are on our way to investigate. We hope to come to a conclusion before anyone else goes missing.");
  $('.logbook').append("-X-File added to inventory");
  $('.fa-file-excel-o').addClass('show');
  $('.logbook').append(" ,your health is currently at 100%");
  $('.fa-smile-o').addClass('show');
}

function Evidence() {
  this.clue = clues[Math.floor(Math.random() * locations.length)];


}

var xFiles = {
  init: function() {
    xFiles.initEvents();
  },
  initStyling: function() {

  },
  initEvents: function() {
    //click and submit events to change what happens
      $('#start').on('submit', function(event) {
        event.preventDefault();
        xFiles.mission = new Mission();
        xFiles.renderGame();
    });
  },
  renderGame: function() {
    $('.enter').removeClass('show');
    $('.main').addClass('show');

    //what needs to appear?
      //-inventory items
  }
}

$(document).ready(function(){
  xFiles.init();
});
