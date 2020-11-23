//zelle
const zellen = document.querySelectorAll('.zelle');

zellen.forEach( zelle => {
  zelle.addEventListener('click', e => {
    abwechslung(e);
  });
});

let times = 1; //how often it was clicked
document.addEventListener('DOMContentLoaded', () => {
  
});

let saver = []; // the cells that are already taken

const abwechslung = (e) => {
    if (!saver.includes(e.target.dataset.num)) {
      if (times % 2 === 0) { // if even then 'x' 
      e.target.innerText = 'o';
      times++;
      saver.push(e.target.dataset.num);
      evaluate('o');
      }
      else { // else 'o'
      e.target.innerText = 'x';
      times++;
      saver.push(e.target.dataset.num);
      evaluate('x');
    }
    }
}

const regex = /6|12|15|18|24/;

const evaluate = (sign) => {
  let container = [];
  zellen.forEach( (zelle) => {
    if (zelle.innerText === sign) {
      container.push(zelle.dataset.num);
    }
  });
  container.sort( (a,b) => a - b); // order the container
  container = container.map( elem => {
    return Number.parseInt(elem);
  });
  console.log(container)
  let sum = 0; // sum of the 3 elements
  let test = [false, false, false];
  // test horizontal for 3
  for (let i=0; i<container.length-1; i++) {
    if (Math.abs(container[i]-container[i+1]) === 1) {
      test[i] = true;
    }
  }
  sum = container[0]+container[1]+container[2];
  if (regex.test(sum.toString())) test[2] = true;
  if (!test.includes(false)) {
    completed(sign);
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
  sum = container[0]+container[1]+container[2];
  if (regex.test(sum.toString())) test[2] = true;
  if (!test.includes(false)) {
    completed(sign);
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
  sum = container[0]+container[1]+container[2];
  if (regex.test(sum.toString())) test[2] = true;
  if (!test.includes(false)) {
    completed(sign);
  }
  else  {
    test = [false, false, false];
    sum = 0;
  }
}


let result = document.querySelector('.result');
const completed = (sign) => {
  result.innerText = sign + " gewinnt";
  setTimeout(restart, 2000);
}

const restart = () => {
  // set everything as before
  result.innerText = '';
  zellen.forEach( zelle => {
    zelle.innerText = '';
  })
}