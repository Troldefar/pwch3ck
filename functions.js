const meter   = document.querySelector('.meter');
const input   = document.querySelector('#pw');
const args    = document.querySelector('#args');
const header  = document.querySelector('.header');

export function updateMeter() {
  const flawArray = calcPw(input.value);
  let totalMeterValue = 100;
  // reset inner
  args.innerHTML = '';
  flawArray.forEach(flaw => {
    if(!flaw) return;
    const errMsg = flaw.msg;
    const element = document.createElement('div');
    element.classList.add('arg');
    element.innerHTML = errMsg;
    args.appendChild(element);
    totalMeterValue -= flaw.cost;
  });
  meter.style.setProperty('--endurance', totalMeterValue);
}

function calcPw(pw) {
  const flaws = [];
  flaws.push(lengthFlaw(pw));
  flaws.push(lowercaseFlaws(pw));
  flaws.push(uppercaseFlaws(pw));
  flaws.push(numberFlaws(pw));
  flaws.push(specialCharsFlaws(pw));
  flaws.push(repeatCharFlaws(pw));
  return flaws;
}

function lowercaseFlaws(pw) {
  return charTypeWeakness(pw, /[a-z]/g, 'lowercase');
}

function uppercaseFlaws(pw) {
  return charTypeWeakness(pw, /[A-Z]/g, 'uppercase');
}

function numberFlaws(pw) {
  return charTypeWeakness(pw, /[0-9]/g, 'numbers');
}

function specialCharsFlaws(pw) {
  return charTypeWeakness(pw, /[^0-9a-zA-Z\s]/g, 'special chars');
}

function repeatCharFlaws(pw) {
  const flaw = pw.match(/(.)\1/g) || [];
  if(flaw.length > 0) {
    return {
      msg: 'Repeated chars is nono',
      cost: flaw.length * 5
    }
  }
}

function charTypeWeakness(pw, regex, type) {
  const flaws = pw.match(regex)|| [];
  if(!flaws) {
    return {
      msg: `No ${type} case characters`,
      cost: 30
    }
  }
  if(flaws.length < 3) {
    return {
      msg: `Your pw could use more ${type}case ccs`,
      cost: 15
    }
  }
}

function lengthFlaw(pw) {
  const length = pw.length;
  if(length < 5) {
    return {
      msg: 'Too short',
      cost: 40
    }
  }
  if(length < 10) {
    return {
      msg: 'Could be longer, still',
      cost: 20
    }
  }
}