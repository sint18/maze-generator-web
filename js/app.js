import { createMaze } from "./mazeGenerator.mjs";

const canvas = document.getElementById('mazeCanvas')
const ctx = canvas.getContext("2d");

const sizeInput = document.getElementById('sizeInput')
const generateBtn = document.getElementById('generateBtn')
const resetBtn = document.getElementById('resetBtn')
generateBtn.addEventListener('click', () => {
  const size = Number(sizeInput.value)
  if (size > 0 && size < 1000) {
    createMaze(size)
    generateBtn.setAttribute('disabled', null)
    sizeInput.setAttribute('readonly', null)
  }
})
resetBtn.addEventListener('click', () => {
  ctx.reset()
  generateBtn.removeAttribute('disabled')
  sizeInput.removeAttribute('readonly')


})


