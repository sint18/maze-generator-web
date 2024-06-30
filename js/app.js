import {createMaze} from "./mazeGenerator.mjs";

const canvas = document.getElementById('mazeCanvas')
const ctx = canvas.getContext("2d");

const sizeInput = document.getElementById('sizeInput')
const generateBtn = document.getElementById('generateBtn')
const messageDiv = document.getElementById('message')
generateBtn.addEventListener('click', () => {
  messageDiv.textContent = ''
  const size = Number(sizeInput.value)
  try {
    if (size <= 0) throw { name: 'Too Small', message: 'Try a bigger number'}
    createMaze(size)
  } catch ({name, message}) {
    messageDiv.textContent = name + ': ' + message
  }
})


