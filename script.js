let dealerSuma = 0;
let graczSuma = 0;

let dealerAceCount = 0;
let graczAceCount = 0;

let hidden;
let talia;

let canHit = true; // pozwala graczowi dobrać kartę jeśli yourSum <= 21

window.onload = function(){
    zbudujKarty();
    tasowanieKart();
    startGry();
}

function zbudujKarty() {
    let numer = ["A","2","3","4","5","6","7","8","9","10","J","D","K"]; /// wszystkie karty 
    let kolor = ["K","P","C","T"]; /// K - karo, P - pik, C - czerwo, T - trefl
    talia = [];
 //   let karty = ["AK", "2K"...];  
   
 for (let i = 0; i < kolor.length; i++) {
        for (let j = 0; j < numer.length; j++) {
            talia.push(numer[j] + "-" + kolor[i]);
        }
    }
    // console.log(talia);
}

function tasowanieKart() {
    for (let i = 0; i < talia.length; i++) {
        let j = Math.floor(Math.random() * talia.length);
        let temp = talia[i];
        talia[i] = talia[j];
        talia[j] = temp;

    }
    console.log(talia);
}

function startGry() {
    hidden = talia.pop();
    dealerSuma += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSuma);
    
    while (dealerSuma < 17) {
        let kartaImg = document.createElement("img");
        let karta = talia.pop();
        kartaImg.src = "./karty_OG_Projcet/" + karta + ".png";
        dealerSuma += getValue(karta);
        dealerAceCount += checkAce(karta);
        document.getElementById("dealer-karty").append(kartaImg);
    }
    console.log(dealerSuma);
    
    for (let i = 0; i < 2; i++) {
        let kartaImg = document.createElement("img");
        let karta = talia.pop();
        kartaImg.src = "./karty_OG_Projcet/" + karta + ".png";
        graczSuma += getValue(karta);
        graczAceCount += checkAce(karta);
        document.getElementById("gracz-karty").append(kartaImg);
    }

    console.log(graczSuma);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("reset").addEventListener("click", reset);
    document.getElementById("gracz-suma").innerText = graczSuma;
    document.getElementById("dealer-suma").innerText = "?";
}

function hit() {
    if (!canHit) {
        return;
    }

    let kartaImg = document.createElement("img");
    let karta = talia.pop();
    kartaImg.src = "./karty_OG_Projcet/" + karta + ".png";
    graczSuma += getValue(karta);
    graczAceCount += checkAce(karta);
    document.getElementById("gracz-karty").append(kartaImg);

    while (graczSuma > 21 && graczAceCount > 0) {
        graczSuma -= 10;
        graczAceCount -= 1;
    }

    while (dealerSuma > 21 && dealerAceCount > 0) {
        dealerSuma -= 10;
        dealerAceCount -= 1;
    }

    // Update the player's total display
    document.getElementById("gracz-suma").innerText = graczSuma;

    if (graczSuma > 21) {
        canHit = false;
        let message = "Przegrałeś!";
        document.getElementById("wynik").innerText = message;
        document.getElementById("dealer-suma").innerText = dealerSuma;
        document.getElementById("hidden").src = "./karty_OG_Projcet/" + hidden + ".png";
        document.getElementById("wynik").innerText = message;
    }
}

function getValue(karta) {
    let data = karta.split("-");
    let value = data[0];
    
    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
        }
        return parseInt(value);
    }

function checkAce(karta) {
    if (karta[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(graczSuma, graczAceCount) {
    while (graczSuma > 21 && graczAceCount > 0) {
        graczSuma -= 10;
        graczAceCount -= 1;
    }
    return graczSuma;
}

function stay() {
    dealerSuma = reduceAce(dealerSuma, dealerAceCount);
    graczSuma = reduceAce(graczSuma, graczAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./karty_OG_Projcet/" + hidden + ".png";

    let message = "";
    if (graczSuma > 21) { 
        message = "Przegrałeś!"
    }
    else if (dealerSuma > 21){
        message = "Wygrałeś!";
    }
    // gracz i dealer mają sume kart mniejsza na 21 
    else if (graczSuma == dealerSuma) {
        message = "Remis!";
    }
    else if (graczSuma > dealerSuma){
        message = "Wygrałeś!";
    }
    else if (graczSuma < dealerSuma){
        message = "Przegrałeś!";
    }
    
    document.getElementById("gracz-suma").innerText = graczSuma;
    document.getElementById("dealer-suma").innerText = dealerSuma;
    document.getElementById("wynik").innerText = message;
}

function reset() {
    location.reload();
}