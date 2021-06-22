function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomLetter() {
var alphabet = ['あ','か','い','た','り','が','ば','い','き','み','ぼ','ぞ','か','し','愛','分','私','は','放','を','あ','ら','あ','私','x','Z']
return alphabet[rand(0,alphabet.length - 1)]
}
function getRandomWord(word) {
var text = word.innerHTML

var finalWord = ''
for(var i=0;i<text.length;i++) {
  finalWord += text[i] == ' ' ? ' ' : getRandomLetter()
}

return word = finalWord
}

var word = document.querySelector('h1')
var interv = 'undefined'
var canChange = false
var globalCount = 0
var count = 0
var INITIAL_WORD = word.innerHTML;
var isGoing = false

function init() {
if(isGoing) return;

isGoing = true
var randomWord = getRandomWord(word)
word.innerHTML = randomWord

interv = setInterval(function() {
var finalWord = ''
for(var x=0;x<INITIAL_WORD.length;x++) {
 if(x <= count && canChange) {
  finalWord += INITIAL_WORD[x]
 } else {
  finalWord += getRandomLetter()
 }
}
word.innerHTML = finalWord
if(canChange) {
  count++
}
if(globalCount >= 6) {
 canChange = true
}
if(count>=INITIAL_WORD.length) {
 clearInterval(interv)
 count = 0
 canChange = false
 globalCount = 0
 isGoing = false
}
globalCount++
},40)

}

word.addEventListener('mouseenter', init)

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 1) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

const phrases = [
  '😈 NAWZAT 😇',
  'Solidity & ERC-20 & BSC',
  'Blockchain App Developer',
  'Security',
  '&',
  '😈💔😈',
  'Germany',
  'Ethical Hacking \ { * } 夢',
  '非常識なプログラマー',
  'هناك قاعدتان لكل شيئ',
  'القاعدة الأولى',
  'لا تتكلم كل شيئ تعرفه',
  '1Z99',
  '😈'
]

const el = document.querySelector('.text-change')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 400)
  })
  counter = (counter + 1) % phrases.length
}

next()



