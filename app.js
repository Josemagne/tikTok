//zelle
const zellen = document.querySelectorAll('.zelle');
const background = document.body.style.backgroundColor;

zellen.forEach( zelle => {
  zelle.addEventListener('click', e => {
    abwechslung(e);
  });
});

let times = 0; //how often it was clicked
let freeze = false // cannot set any sign
document.addEventListener('DOMContentLoaded', () => {
  
});

let saver = []; // the cells that are already taken
const pair = ['o', 'x'];

const abwechslung = (e) => {
    if (!saver.includes(e.target.dataset.num) && !freeze) {
      
      if (times % 2 === 0) { // if even then 'x' 
      e.target.innerText = 'o';
      times++;
      saver.push(e.target.dataset.num);
      if (times >= 5) {
        evaluate('o');
      }
      }
      else { // else 'o'
      e.target.innerText = 'x';
      times++;
      saver.push(e.target.dataset.num);
      if (times >= 5) {
        evaluate('o');
      }
    }
    setTimeout(bot(e.target.innerText), 2000);
    }
}



const evaluate = (sign) => {

  let container = []; // 
  zellen.forEach( (zelle) => {
    if (zelle.innerText === sign) {
      container.push(zelle.dataset.num);
    }
  });

  if (times === 9) completed('restart');
  container.sort( (a,b) => a - b); // order the container
  container = container.map( elem => {
    return Number.parseInt(elem);
  });
  console.log(container)
  let sum = 0; // sum of the 3 elements
  let test = [false, false, false]; // 1. difference 2. difference 3. biggest num is 3,6,9 or 7,8,9 or 7,9
  // test horizontal for 3
  for (let i=0; i<container.length-1; i++) {
    if (Math.abs(container[i]-container[i+1]) === 1) {
      test[i] = true;
    }
  }
  let copyContainer = container.slice(0,3) // take the first 3 nums
  if (copyContainer[2] === 3 || copyContainer[2] === 6 || copyContainer[2] === 9 ) test[2] = true;
  if (!test.includes(false)) {
    completed(sign);
    console.log('h')
  }
  else  {
    test = [false, false, false];
    sum = 0;
  }

  // test vertical for 3
  for (let i=0; i<container.length-1; i++) {
    if (Math.abs(container[i]-container[i+1]) === 3) {
      test[i] = true;
    }
  }
  if (copyContainer[2] === 7 || copyContainer[2] === 8 || copyContainer[2] === 9 ) test[2] = true;
  if (!test.includes(false)) {
    completed(sign);
    console.log('v')
  }
  else  {
    test = [false, false, false];
    sum = 0;
  }

  // test diagonal for 3
  for (let i=0; i<container.length-1; i++) {
    if (Math.abs(container[i]-container[i+1]) === 2 ||
        Math.abs(container[i]-container[i+1]) === 4) {
      test[i] = true;
    }
  }
  if (copyContainer[2] === 7 || copyContainer[2] === 9 ) test[2] = true;
  if (!test.includes(false)) {
    completed(sign);
  }
  else  {
    test = [false, false, false];
    sum = 0;
    setTimeout(bot(sign), 1000);
  }
}


let result = document.querySelector('.result p');
const completed = (sign) => {
  if(sign === 'restart') {
    freeze = true;
    result.innerText = 'restart';
    setTimeout(restart('restart'), 2000);
    times = 0;
  }
  else {
    freeze = true;
    result.innerText = sign + " gewinnt";
    if (sign === pair[0]) background = 'green';
    else background = 'red';
    setTimeout(restart(), 2000);
    times = 0;
  }
}

const restart = (text) => {
  // set everything as before
  if (text === 'restart') {
  console.log(times)
  result.innerText = '';
  zellen.forEach( zelle => {
    zelle.innerText = '';
  });
  saver = [];
  freeze = false;
  background = '';
  }
  else {
  console.log(times)
  result.innerText = '';
  zellen.forEach( zelle => {
    zelle.innerText = '';
  });
  saver = [];
  freeze = false;
  background = '';
  }
  
}

const bot = (sign) => {
  let random = randomNumber();
  let filler = (pair[0] === sign) ? pair[1] : pair[0];
  zellen[random].innerText = filler;
}

const randomNumber = () => {
  let random = Math.floor(Math.random() * 8);
  if (saver.includes(random.toString())) {
    console.log(typeof random.toString())
    randomNumber();
  }
  
  else {
    console.log(random, zellen[random]);
    return random;
  }
}