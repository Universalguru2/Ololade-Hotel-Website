const ropeHandle = document.getElementById("ropeHandle");
const pullRope = document.getElementById("pullRope");
const loginForm = document.getElementById("loginForm");
const lampContainer = document.getElementById("lampContainer");

let isDragging = false;
let startY = 0;
let pull = 0;
let velocity = 0;
let lampOn = false;
let hasTriggered = false;
const maxPull = 140;
const springStrength = 0.08;
const damping = 0.88;
let swingAngle = 0;
let swingVelocity = 0;

// hide form initially
loginForm.classList.add("hidden");

// Dragging events
ropeHandle.addEventListener("mousedown", startDrag);
ropeHandle.addEventListener("touchstart", startDrag, {passive:false});

function startDrag(e){
  e.preventDefault();
  isDragging = true;
  hasTriggered = false;
  startY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag, {passive:false});
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
}

function drag(e){
  if(!isDragging) return;
  const currentY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
  pull = Math.max(0, Math.min(maxPull, currentY - startY));

  if(pull > 80 && !hasTriggered){
    lampOn = !lampOn;
    hasTriggered = true;
    updateLoginState();
  }
}

function stopDrag(){
  isDragging = false;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);
}

function updateLoginState(){
  if(lampOn){
    lampContainer.classList.add("lamp-on");
    loginForm.classList.remove("hidden");
    loginForm.classList.add("visible");
    loginBtn.disabled = false;
  } else {
    lampContainer.classList.remove("lamp-on");
    loginForm.classList.remove("visible");
    loginForm.classList.add("hidden");
    loginBtn.disabled = true;
  }
}

// Animation
function animate(){
  if(!isDragging){
    let force = -pull*springStrength;
    velocity += force;
    velocity *= damping;
    pull += velocity;
    if(Math.abs(pull)<0.2){ pull = 0; velocity = 0;}
  }

  swingVelocity += -swingAngle*0.05;
  swingVelocity *= 0.9;
  swingAngle += swingVelocity + velocity*0.15;

  updateUI();
  requestAnimationFrame(animate);
}

function updateUI(){
  const ropeBaseHeight = 90;
  const ropeTop = 130;
  const newHeight = ropeBaseHeight + pull;
  pullRope.style.height = newHeight+"px";
  ropeHandle.style.top = ropeTop + newHeight - 12 +"px";
  ropeHandle.style.transform = `rotate(${swingAngle}deg)`;
  pullRope.style.transform = `rotate(${swingAngle*0.2}deg)`;
}

animate();
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function(){

const username = document.getElementById("loginUsername").value.trim();
const password = document.getElementById("loginPassword").value;

const storedUser = JSON.parse(localStorage.getItem("lampUser"));

if(!storedUser){
  loginBtn.disabled = false
}

if(username === storedUser.username && password === storedUser.password){

alert("Login successful!");

window.location.href = "Ololade hotel/ololade hotel.html";

}else{

alert("Wrong username or password");

}

});