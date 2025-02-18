document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startGameButton").addEventListener("click", function() {
        document.getElementById("startMenu").classList.add("hidden");
        document.getElementById("gameContainer").classList.remove("hidden");

        // Get elements **AFTER** the menu is hidden
        textElement = document.getElementById("text");
        choicesElement = document.getElementById("choices");

        // Start the game only when elements exist
        if (textElement && choicesElement) {
            startGame();
        } else {
            console.error("Error: Game elements not found.");
        }
    });

    document.getElementById("instructionsButton").addEventListener("click", function() {
        document.getElementById("instructions").classList.toggle("hidden");
    });
});
// Declare variables globally
let textElement;
let choicesElement;
// Game Story Data
const story = {
  start: {
    text: "You wake up in a dark forest. The air is thick with mist. A path splits ahead.",
    choices: [
      { text: "Go left", next: "left_path" },
      { text: "Go right", next: "right_path" }
    ]
  },
  left_path: {
text: "The left path winds through trees gnarled like clawed hands. The deeper you go, the heavier the air becomes, thick with an unnatural silence. The mist here clings to the ground, as if afraid to rise. An abandoned shrine stands ahead, cracked stone and rotting wood held together by the weight of forgotten prayers. Strange symbols cover the walls, shifting slightly when you try to focus on them.",
    choices: [
      { text: "Investigate the shrine", next: "go_inside" },
      { text: "Keep walking", next: "deep_forest" }
    ]
  },
  right_path: {
    text: "The right path leads to a river. The water glows faintly blue.",
    choices: [
      { text: "Drink the water", next: "drink" },
      { text: "Cross the river", next: "cross" }
    ]
  },
  go_inside: {
text: "Inside the shrine, the symbols react to your presence. " +
"The air inside is stagnant, heavy with whispers that aren’t yours. " +
"A pedestal sits in the center, atop it rests gold-plated scales, gleaming unnaturally in the dim light. " +
"The moment you step forward, something whispers your name.",
    choices: [
      { text: "Walk over and Pick up the scales", next: "cloud_emerges" },
      { text: "Leave quickly", next: "deep_forest" }
    ]
  },
  deep_forest: {
    text: "Deeper in the forest, you hear footsteps behind you.",
    choices: [
      { text: "Turn around", next: "turn" },
      { text: "Run!", next: "run" }
    ]
  },
  drink: {
    text: "The glowing water grants you visions of another world. You feel lightheaded.",
    choices: [
      { text: "Embrace the vision", next: "vision_end" },
      { text: "Shake it off", next: "cross" }
    ]
  },
  cross: {
    text: "You cross the river safely and reach a hidden temple.",
    choices: [
      { text: "Enter the temple", next: "temple" }
    ]
  },
  cloud_emerges: {
    text: "You reach for the scales, and the moment your fingers brush against them, the shrine shudders." +
     "Dust and debris fall as a sudden pressure fills the room. The air grows cold, and a dark mist swirls  " +
     "Before you stands an ancient entity—its form humanoid, yet wrong. It has the head of a jackal, with piercing gold eyes that burn with recognition.",
    choices: [
      { text:  "Stand firm ", next: "anubis_explanation" },
      { text: "Drop the scales and run away", next: "deep_forest" }
    ]
  },
  turn: {
    text: "A shadowy figure stands behind you. It smiles.",
    choices: [
      { text: "Speak to it", next: "shadow_talk" },
      { text: "Run", next: "run" }
    ]
  },
  run: {
    text: "You run until your lungs burn. The forest seems endless.",
    choices: [
      { text: "Collapse", next: "collapse" },
      { text: "Keep running", next: "keep_running" }
    ]
  },
  collapse: {
    text: "You collapse in exhaustion. The last thing you see is a pair of glowing eyes approaching...",
    choices: []
  },
  keep_running: {
    text: "You run and run... until you see a light in the distance. Hope?",
    choices: []
  },
  shadow_talk: {
    text: "The shadow speaks your name. You remember everything.",
    choices: []
  },
  vision_end: {
    text: "As you embrace the vision, the world is illuminated, revealing a lone warrior standing atop a ruined shrine in the distance."+
    "His armor is fractured yet regal, his long, storm-dark hair whipping violently in the wind. In his hand, a blade pulses with power—a jagged katana, crackling with arcs of living lightning."+ 
    "Susanoo has been waiting...",
    choices: [
      { text: " Listen to the warrior", next: "susanoo" },
      { text: "Refuse to listen and wake up from the vision.", next: "cross" }
    ]
  },
  susanoo: {
    text: "I am Susanoo, the storm god, and I have been waiting for you. " +
    "The tide surges, the winds wail, and yet you stand. But can you wield the storm, or will it devour you?"+
    "Face me hear and now, it is no coincidence that you are here. You are the one I have been waiting for. " +
    "Trust me, you will not be able to return to the mortal realm without my help or any help from another god.",
  choices: [ 
    { text: "Accept the challenge", next: "accept" },
    { text: "Refuse", next: "collapse" }
  ],
},
  anubis_explanation:{
    text: "I am Anubis, protector of the dead, its golden eyes piercing through the darkness." +
     "You have fallen ill to a unknown diesease an must walk the path between worlds. The land of Eclipsera is your trial, a liminal space between life and death." +
      "If you wish to return to the mortal realm, you must journey through its depths and overcome the forces that seek to keep you here." +
       "But beware, Anubis warns, his voice growing heavier with meaning. Your journey is not merely for yourself. The ones you cherish, those who linger in your thoughts—darkness threatens them too. If you falter, they may be lost and never allowed to rest in eternal peace." +
        " Nothing but evil and terror lurk beyond the veil. You have the option to try and tame my power or leave to find another gods ability to help you.",
    choices: [
        { text: "Tame Anubis's power", next: "tame" },
        { text: "Leave", next: "leave" }
    ]
  },
  temple: {
    text: "Inside the temple, a great door stands before you. Do you enter?",
    choices: []
  },
// Function to Start Game (Runs After Button Click)
function startGame:() {
    if (!textElement || !choicesElement) {
        console.error("Error: Game elements not found.");
        return;
    }
    showText(story.start);
// Show Story Text with Typing Effect
function showText(storyNode) {
    textElement.innerHTML = ""; // Clear text
    let index = 0;
    function typeWriter() {
        if (index < storyNode.text.length) {
            textElement.innerHTML += storyNode.text.charAt(index);
            index++;
            setTimeout(typeWriter, 30);
        } else {
            showChoices(storyNode.choices);
        }
    }
    typeWriter();
}

// Show Choices as Buttons
function showChoices(choices) {
    choicesElement.innerHTML = ""; // Clear old choices
    choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice.text;
        button.classList.add("choice-btn");
        button.onclick = () => showText(story[choice.next]);
        choicesElement.appendChild(button);
    });
}
function goToPage(page) {
    window.location.href = page;
}
