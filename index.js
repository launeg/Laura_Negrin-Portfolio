const canvas = document.getElementById('gameCanvas')
const c = canvas.getContext('2d')

// Make the canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5;

class Player {
  constructor(position) {
    this.position = position 
    this.velocity = {
      x: 0,
      y: 1
    }
    this.height = 150
    this.width = 150
  }

//   draw() {
//     c.fillStyle = 'red'
//     c.fillRect(this.position.x, this.position.y, this.width, this.height)
//   }
draw() {
    const img = new Image();
    img.src = 'images/tut.png';
    c.drawImage(img, this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      this.velocity.y += gravity
    } else { 
      this.velocity.y = 0 
    }
  
    // With this the character stays on screen
    if (this.position.x < 0) this.position.x = 0
    if (this.position.x + this.width > canvas.width) 
      this.position.x = canvas.width - this.width
    if (this.position.y + this.height > canvas.height) 
      this.position.y = canvas.height - this.height
  }
  
}

const player = new Player({
    x: 50,
    y: 50
})

const keys = {
    a: {pressed: false},
    d: {pressed: false},
    w: {pressed: false},
}

function animate() {
  window.requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update()
  player.velocity.x = 0
  if (keys.d.pressed && player.position.x < canvas.width - player.width) player.velocity.x = 6
  else if (keys.a.pressed && player.position.x > 0) player.velocity.x = -6
}

animate()

window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'w':
            if (player.position.y === canvas.height - player.height)
                player.velocity.y = -20
            break    
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break 
    }
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
