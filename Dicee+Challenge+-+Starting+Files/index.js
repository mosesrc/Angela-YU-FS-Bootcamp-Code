var randNum1 = Math.floor(Math.random() * 6) + 1;
var randNum2 = Math.floor(Math.random() * 6) + 1;

function winner(one, two) {
    var h1 = document.getElementsByTagName('H1')[0];
    if (one > two) {
        h1.innerText = `🚩 Player 1 Wins!`
    } else if (one < two) {
        h1.innerText = ` Player 2 Wins! 🚩`
    } else if (one === two) {
        h1.innerText = 'Draw!'
    }  
}

const img1 = document.querySelector('.img1');
img1.setAttribute('src', `./images/dice${randNum1}.png`);

const img2 = document.querySelector('.img2');
img2.setAttribute('src', `./images/dice${randNum2}.png`);

winner(randNum1, randNum2);