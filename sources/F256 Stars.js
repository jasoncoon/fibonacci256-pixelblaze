// Fibonacci Stars pattern by Jason Coon
// For Fibonacci256: https://www.tindie.com/products/19429
// modified by Ben Hencke to run on Pixelblaze

var starCount = 5;
var starMagicNumbers = [8, 13, 21]

var fibonacciToPhysical = [ 0, 157, 78, 235, 118, 39, 196, 79, 236, 156, 40, 197, 117, 1, 158, 77, 234, 119, 38, 195, 80, 237, 155, 41, 198, 116, 2, 159, 76, 233, 120, 37, 194, 81, 238, 154, 42, 199, 115, 3, 160, 75, 232, 121, 36, 193, 82, 239, 153, 43, 200, 114, 4, 161, 74, 231, 122, 35, 192, 83, 240, 152, 44, 201, 113, 5, 162, 73, 230, 123, 34, 191, 84, 241, 151, 45, 202, 112, 6, 163, 72, 229, 124, 33, 190, 85, 242, 150, 46, 203, 111, 7, 164, 71, 228, 125, 32, 189, 86, 243, 149, 47, 204, 110, 8, 165, 70, 227, 126, 31, 188, 87, 244, 148, 48, 205, 109, 9, 166, 69, 226, 127, 30, 187, 88, 245, 147, 49, 206, 108, 10, 167, 68, 225, 128, 29, 186, 89, 246, 146, 50, 207, 107, 11, 168, 67, 224, 129, 28, 185, 90, 247, 145, 51, 208, 106, 12, 169, 66, 223, 130, 27, 184, 91, 248, 144, 52, 209, 105, 13, 170, 65, 222, 131, 26, 183, 92, 249, 143, 53, 210, 104, 14, 171, 64, 221, 132, 25, 182, 93, 250, 142, 54, 211, 103, 15, 172, 63, 220, 133, 24, 181, 94, 251, 141, 55, 212, 102, 16, 173, 62, 219, 134, 23, 180, 95, 252, 140, 56, 213, 101, 17, 174, 61, 218, 135, 22, 179, 96, 253, 139, 57, 214, 100, 18, 175, 60, 217, 136, 21, 178, 97, 254, 138, 58, 215, 99, 19, 176, 59, 216, 137, 20, 177, 98, 255 ]
var stars = array(starCount)
var moveTimer
var gHue = 0
var leds = array(pixelCount)
var hues = array(pixelCount)
var fade = 0.995
var moveTimerTarget = 90

export function sliderSpeed(v) {
  v = 1-v
  moveTimerTarget = 10 + (v*v)*190
}

export function sliderFade(v) {
  fade = (1-(v*v)) * .0999 + .9
}


//setup initial stars state
stars.mutate(() => {
  var offset = starMagicNumbers[random(starMagicNumbers.length)]
  return [
    randomInt(offset),
    offset
    ]
})


export function beforeRender(delta) {
  gHue = (gHue + delta/40) % 256
  
  
  //only move the stars every so often
  moveTimer += delta
  if (moveTimer > moveTimerTarget) {
    moveTimer -= moveTimerTarget
    updateFibonacciStars()
  }
  
  //fade to black
  leds.mutate(v => v * fade)
  
  drawFibonacciStars()
}

export function render2D(index, x, y) {
  v = leds[index]
  h = hues[index]/ 256
  hsv(h, 1.75 - v, pow(v, 2))
}


function randomInt(n) {
  return floor(random(n))
}


function updateFibonacciStars() {
  stars.forEach((star) => {
    // move the stars
    star[0] += star[1]
    
    //reset any stars out of bounds
    if (star[0] >= pixelCount) {
      star[1] = starMagicNumbers[random(starMagicNumbers.length)]
      star[0] = randomInt(star[1])
    }
  })
}

function drawFibonacciStars() {
  stars.forEach((star) => {
    var index = fibonacciToPhysical[star[0]];
    // draw the star
    leds[index] = 1
    hues[index] = star[0] + gHue
  });
}
