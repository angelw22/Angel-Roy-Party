var bg = document.getElementById('icebg')
var chibi = document.getElementById('chibis');
var chibiWidth = document.getElementById('chibis').clientWidth;
var chibiheight = document.getElementById('chibis').clientHeight;
var bgheight = document.getElementById('icebg').clientHeight;

var chibiX = window.innerWidth/2 - (chibiWidth/2);
var chibiY = bgheight/10;
var originalX = chibiX

window.onload = (e) => {
  chibi.style.left = chibiX;
  chibi.style.top = chibiY;

  if (window.innerWidth < 600) {
    document.getElementById('icebg').src = "./img/icerinksmall.png"
  } else {
    document.getElementById('icebg').src="./img/icerinkbg.png"
  }
}


window.addEventListener("keydown", moveSomething, false);

function deviceOrientationListener(event) {

  var allowance = (window.innerWidth - chibiWidth)/2;

  if (event.gamma) {
    if (event.gamma < allowance && event.gamma > -(allowance)) {
      chibiX = originalX + event.gamma;
      chibi.style.left = chibiX;
    } else if (event.gamma > allowance) {
      chibiX = originalX + allowance
    } else if (event.gamma > -(allowance)) {
      chibiX = originalX - allowance
    } 
    else if (event.gamma == 0) {
      chibiX = originalX;
      chibi.style.left = chibiX;
    }
  }
}


if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", deviceOrientationListener);
} 


function moveSomething(e) {
  if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
  };

  switch(e.key) {
      case "ArrowLeft":
          // left key pressed
          if (chibiX > 10) {
            chibiX -= 20;
          }
          
          chibi.style.left = chibiX;
          break;
      case "ArrowUp":
          // up key pressed
          if (chibiY > 10) {
            chibiY -= 20;
          }
          chibi.style.top = chibiY;
          break;
      case "ArrowRight":
          // right key pressed
          if (chibiX < (window.innerWidth -10)) {
            chibiX += 20;
          }
          
          chibi.style.left = chibiX;
          break;
      case "ArrowDown":
          // down key pressed
          if (chibiY < bgheight - (10 + chibiheight)) {
            chibiY += 20;
          }
          chibi.style.top = chibiY;
          break;  
  }   
}  

