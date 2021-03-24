import { updateMeter } from './functions.js'; 
const input = document.querySelector('#pw');

input.addEventListener('input', updateMeter);

updateMeter();