export function threeSecondDelay() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 3000);
  });
}

export function twoSecondDelay() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  });
}

export function oneSecondDelay() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}

export function customDelay(num) {
  const time = num * 1000;
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
