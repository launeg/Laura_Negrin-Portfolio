const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
const gravity = 0.5

class Sprite {
    constructor({position, imageSrc}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        if (!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y)
    }
    update() {
        this.draw()
    }
}


class Player {
  constructor(position) {
    this.position = position 
    this.velocity = {
      x: 0,
      y: 1
    }
    this.height = 100
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, 100, this.height)
  }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y < canvas.height)
            this.velocity.y += gravity
        else { this.velocity.y = 0 }
        }
        
    }


const player = new Player({
        x: 100,
        y: 100
    })
const player2 = new Player({
    x: 300,
    y: 100
})

const keys = {
    a: {pressed: false},
    d: {pressed: false},
    w: {pressed: false},
}

const background = new Sprite({
    position: {
    x: 0,
    y: 0, 
    },
    imageSrc: './images/NY.png',
})




function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0,0, canvas.width, canvas.height)
  
  c.save()
  c.scale(.57,.579)
  background.update()
  c.restore()
  player.update()
  player2.update()

  player.velocity.x = 0
  if (keys.d.pressed) player.velocity.x = 4
  else if (keys.a.pressed) player.velocity.x = -4
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
            player.velocity.y = -19

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