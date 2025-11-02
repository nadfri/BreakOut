/******************Declaration of Global Variables**********************/
class Shape {
  constructor(posX, posY, l, h, radius, color) {
    this.posX = posX;
    this.posY = posY;
    this.l = l;
    this.h = h;
    this.radius = radius;
    this.color = color;
    this.stroke = '#282828';
  }

  drawCircle() {
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = 'maroon';
    ctx.stroke();
  }

  drawRect() {
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, this.l, this.h);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.stroke;
    ctx.stroke();
  }
}

const myCanvas = document.getElementById('myCanvas');
const canvasH = (myCanvas.height = 500);
const canvasW = (myCanvas.width = 700);
const ctx = myCanvas.getContext('2d');

let paddleRight = false;
let paddleLeft = false;
let stopAnimation = false;
let beginGame = false; //to avoid space bar function

let music = new Audio('sounds/tetris.mp3');
let soundActive;

/*****************************Start of onload***************************/
window.onload = () => {
  'use strict';

  /******************************Audios******************************/
  const gameover = new Audio('sounds/gameover.mp3');
  const broken = new Audio('sounds/broken.wav');
  const win = new Audio('sounds/win.mp3');
  const lost = new Audio('sounds/lost.mp3');
  const extraLife = new Audio('sounds/extraLife.mp3');
  const launch = new Audio('sounds/launch.mp3');
  const finalflash = new Audio('sounds/finalflash.mp3');
  const rasengan = new Audio('sounds/rasengan.mp3');
  const bigger = new Audio('sounds/bigger.mp3');
  const smaller = new Audio('sounds/smaller.mp3');
  const ballSmall = new Audio('sounds/ballSmall.mp3');
  const random = new Audio('sounds/random.mp3');

  const tabAudio = [
    music,
    gameover,
    broken,
    win,
    lost,
    extraLife,
    launch,
    rasengan,
    bigger,
    smaller,
    ballSmall,
    random,
  ];

  /****************Declaration of Local Variables********************/
  const paddle = new Shape(0, 0, 120, 20, 0, 'blue'); // x,y, width,high,*,color
  paddle.posX = (canvasW - paddle.l) / 2;
  paddle.posY = canvasH - paddle.h;
  let paddleSpeed = 10;

  let sizeBall = 7;
  const ball = new Shape(0, 0, 0, 0, sizeBall, 'red'); //x,y,**,**,radius,color

  let gravity;
  let sens;
  let count;
  let life = 3;
  let tabBricks = [];
  let animation;
  let beginScrollY;

  /*01*/ heartUpdate();
  /*02*/ speakerControl();
  /*03*/ launchGame();
  /*04*/ createBricks(tabBricks); //Creation of bricks, see script level_xx
  /*05*/ requestAnimationFrame(motion); //Animation of shape

  function motion() {
    //all frames are drawing here
    ctx.clearRect(0, 0, canvasW, canvasH); //clear canvas
    ball.drawCircle(); //draw ball
    paddle.drawRect(); //draw paddle
    count = nLine * nCol; //number of bricks

    /*01*/ init(); //init values before to play
    /*02*/ paddleControl(); //launch control functions
    /*03*/ updateNumberOfBricks(); //count of bricks not yet destroyed
    /*04*/ updateDrawBricks(); //draw rest of bricks
    /*05*/ detectWallCollision(); //detection wall collision with ball
    /*06*/ detectPaddleCollision(); //detection paddle collision with ball
    /*07*/ detectBrickCollision(); //detection brick collision with ball
    /*08*/ bricksAnimation(); //launch scroll animation of bricks
    /*09*/ ballAnimation(); //launch ball animation
    /*10*/ animation = requestAnimationFrame(motion); //allow start animation
    /*11*/ winOrLose(); //Allow replay or next Level
  }

  /*******************Animation of the ball*************************************/
  function ballAnimation() {
    ball.posY += gravity;
    ball.posX += sens;
  }

  /*******************Function Launch Game *************************************/
  function launchGame() {
    document.onkeypress = (e) => {
      if (e.key == ' ' && beginGame == false) {
        //launch by press bar space
        beginGame = true;
        beginScrollY = true;
        sens = 2.5;
        gravity = 4;
        music.loop = true;
        info.textContent = '';
        music.play();
      }

      if (e.key == 'Enter') document.location = './index.html'; //press enter to go to menu
      if (e.keyCode == 112) gamePause(); //Game paused by press on "p"

      return false; // to avoid scroll by space bar
    };
  }

  /*******************Function initialize*******************************/
  function init() {
    if (beginGame == false) {
      ball.posX = paddle.posX + paddle.l / 2;
      ball.posY = paddle.posY - ball.radius;
      gravity = 0;
      sens = 0;
      info.textContent = 'Press Space Bar to launch the Ball';
    }
  }

  /***********************************Display of life***************/
  function heartUpdate() {
    heart.textContent = '';
    for (let i = 0; i < life; i++) heart.textContent += '❤️';
  }

  /***********************************Function Losing a life***************/
  function losingLife() {
    lost.play();
    life--;
    heartUpdate();
    beginGame = false;
    clearAllTimers(); // Nettoie tous les timers actifs
    init();
  }

  /***********************************Draw message**************************/
  function drawMessage(text, posX) {
    ctx.beginPath();
    ctx.rect(0, canvasH / 2 - 40, canvasW, 100);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'red';
    ctx.stroke();

    ctx.fillStyle = 'blue';
    ctx.font = '70px orbitron';
    ctx.fillText(text, posX, canvasH / 2 + 30);
    ctx.strokeStyle = 'red';
    ctx.strokeText(text, posX, canvasH / 2 + 30);
  }

  /***********************************Function Win/Lose****************************/
  function winOrLose() {
    if (count == 0) victory();
    if (life == 0) gameOver();
  }

  function gameOver() {
    drawMessage('GAME OVER', 100);
    music.pause();
    gameover.play();
    cancelAnimationFrame(animation);
    clearAllTimers(); // Nettoie tous les timers actifs
    info.textContent = 'Press Space Bar to play again';

    document.onkeypress = (e) => {
      if (e.key == ' ') document.location.reload();
      else if (e.key == 'Enter') document.location = './index.html';
    };
  }

  function victory() {
    drawMessage('VICTORY!', 150);
    music.pause();
    win.play();
    cancelAnimationFrame(animation);
    clearAllTimers(); // Nettoie tous les timers actifs avant d'en créer de nouveaux

    victoryInterval = setInterval(
      () => (info.textContent = 'Press Space Bar to unlock the Next Level'),
      1000
    );
    unlockNextLevel();
  }

  /*******************************Function PAUSE********************* */
  function gamePause() {
    if (stopAnimation == false) {
      info.textContent = '***GAME IS PAUSED***';
      music.pause();
      stopAnimation = true;
      drawMessage('PAUSE', 205);
      cancelAnimationFrame(animation); //Freeze Animation
      keyP.src = 'img/KeyPDown.png';
    } else {
      if (beginGame == true) music.play();
      stopAnimation = false;
      requestAnimationFrame(motion);
      keyP.src = 'img/KeyP.png';
    }
  }

  /***************Sound Control****************************************/
  function mute() {
    if (soundActive == 1) {
      soundActive = 0;
      speaker.textContent = '🔈';
      for (let audio of tabAudio) audio.muted = true;
    } else {
      soundActive = 1;
      speaker.textContent = '🔊';
      for (let audio of tabAudio) audio.muted = false;
    }

    localStorage.setItem('saveMute', soundActive); //save data sound
  }

  function speakerControl() {
    speaker.onclick = () => {
      mute();
    };

    let getStorage = localStorage.getItem('saveMute'); //verify if data in storage
    soundActive = getStorage != null ? getStorage : 1;

    if (soundActive == 0) {
      soundActive = 1;
      mute();
    }
  }

  /********************************Motion Paddle***************************************/
  function paddleControl() {
    document.onkeydown = (e) => {
      if (e.key == 'ArrowRight') {
        paddleRight = true;
        imgRight.src = 'img/RightArrowDown.png';
      }

      if (e.key == 'ArrowLeft') {
        paddleLeft = true;
        imgLeft.src = 'img/LeftArrowDown.png';
      }
    };

    document.onkeyup = (e) => {
      if (e.key == 'ArrowRight') {
        paddleRight = false;
        imgRight.src = 'img/RightArrow.png';
      }

      if (e.key == 'ArrowLeft') {
        paddleLeft = false;
        imgLeft.src = 'img/LeftArrow.png';
      }
    };

    if (paddleRight && paddle.posX < canvasW - paddle.l) paddle.posX += paddleSpeed;
    if (paddleLeft && paddle.posX > 0) paddle.posX -= paddleSpeed;
  }

  /************************Functions to draw Bricks*********************/
  function updateNumberOfBricks() {
    for (let line of tabBricks) //Count of bricks destroyed
      for (let brick of line) if (brick.status == 0) count--;
  }

  function updateDrawBricks() {
    for (let line of tabBricks) //Draw rest of bricks
      for (let brick of line)
        if (brick.status > 0 && count > 1) brick.drawRect();
        else if (brick.status > 0 && count == 1) {
          //last brick bigger
          brick.l = 125;
          brick.color = 'green';
          brick.drawRect();
        }
  }

  /********************************Wall Collision************************************/
  function detectWallCollision() {
    // Désactive les collisions murales pendant Extra Ball et Final Flash (balle immobile)
    if (activePowers.extraBall || activePowers.finalFlash) return;

    if (ball.posY + ball.radius >= canvasH) losingLife(); //Game lost

    if (ball.posY - ball.radius <= 0) {
      //roof
      gravity = -gravity;
      ball.posY = ball.radius + 1;
    }

    if (ball.posX - ball.radius <= 0) {
      //wall left
      sens = -sens;
      ball.posX = ball.radius + 1;
    }

    if (ball.posX + ball.radius >= canvasW) {
      //wall right
      sens = -sens;
      ball.posX = canvasW - ball.radius - 1;
    }
  }

  /********************************Paddle Collision******************************************/
  function detectPaddleCollision() {
    // Désactive les collisions paddle pendant Extra Ball et Final Flash (balle immobile)
    if (activePowers.extraBall || activePowers.finalFlash) return;

    if (ball.posX > paddle.posX && ball.posX < paddle.posX + paddle.l)
      if (ball.posY + ball.radius >= paddle.posY && ball.posY < canvasH) {
        //ball between paddle limits in X
        //ball between paddle limitis in Y
        gravity = -gravity;
        ball.posY = paddle.posY - ball.radius - 1; //out ball from paddle

        // Léger effet si le paddle est en mouvement (limité pour garder le contrôle)
        const maxSpeed = 6; // Vitesse maximale réduite
        if (paddleRight) {
          sens = Math.abs(sens) * 1.1; // Augmentation plus douce
          if (Math.abs(sens) > maxSpeed) sens = sens > 0 ? maxSpeed : -maxSpeed;
        } else if (paddleLeft) {
          sens = -Math.abs(sens) * 1.1; // Augmentation plus douce
          if (Math.abs(sens) > maxSpeed) sens = sens > 0 ? maxSpeed : -maxSpeed;
        }
      }
    //******************************Paddle Corner Collision*************************************/
    if (paddle.posY >= ball.posY && paddle.posY <= ball.posY + ball.radius)
      if (paddle.posX >= ball.posX && paddle.posX <= ball.posX + ball.radius) {
        //ball in Top Corner

        //Left Corner
        gravity = -Math.abs(gravity);
        sens = sens > 0 ? -sens : sens;
        // Effet du mouvement du paddle (limité)
        const maxSpeed = 6;
        if (paddleLeft) {
          sens *= 1.1;
          if (Math.abs(sens) > maxSpeed) sens = sens > 0 ? maxSpeed : -maxSpeed;
        }
      } else if (
        paddle.posX + paddle.l >= ball.posX - ball.radius &&
        paddle.posX + paddle.l <= ball.posX
      ) {
        //Right Corner
        gravity = -Math.abs(gravity);
        sens = sens < 0 ? -sens : sens;
        // Effet du mouvement du paddle (limité)
        const maxSpeed = 6;
        if (paddleRight) {
          sens *= 1.1;
          if (Math.abs(sens) > maxSpeed) sens = sens > 0 ? maxSpeed : -maxSpeed;
        }
      }
  }

  /*********************************Brick Collision*******************************************/
  function brickStatusUpdate(brick, _sens, _gravity) {
    broken.play();
    brick.status--;
    if (brick.status == 2) brick.color = 'rgba(255,165,0,0.5)';
    if (brick.status == 1) brick.color = 'orange';

    // Pendant Extra Ball ou Final Flash, ne pas changer la direction de la balle
    if (!activePowers.extraBall && !activePowers.finalFlash) {
      sens = _sens;
      gravity = _gravity;
    }

    power(brick);
  }

  function detectBrickCollision() {
    let marge = ball.radius; //marge of precision ball collision
    const isGiantBall = activePowers.extraBall || activePowers.finalFlash;

    for (let line of tabBricks)
      for (let brick of line) {
        if (brick.status <= 0) continue; // Ignore les briques déjà détruites

        //********************Brick Horizontal Side*************************************/
        if (
          ball.posX > brick.posX &&
          ball.posX < brick.posX + brick.l &&
          brick.status > 0
        ) {
          //ball between brick
          if (
            ball.posY - ball.radius <= brick.posY + brick.h &&
            ball.posY - ball.radius >= brick.posY + brick.h - marge
          ) {
            //bottom side
            if (!isGiantBall) ball.posY = ball.radius + brick.posY + brick.h + 1; //out ball
            brickStatusUpdate(brick, sens, -gravity);
            continue;
          }

          if (
            ball.posY + ball.radius > brick.posY &&
            ball.posY + ball.radius < brick.posY + marge
          ) {
            //top side
            if (!isGiantBall) ball.posY = brick.posY - ball.radius - 1;
            brickStatusUpdate(brick, sens, -gravity);
            continue;
          }
        }
        //****************Brick Corner Bottom******************************************/
        if (
          brick.posY + brick.h >= ball.posY - ball.radius &&
          brick.posY + brick.h <= ball.posY &&
          brick.status > 0
        )
          if (brick.posX >= ball.posX && brick.posX <= ball.posX + ball.radius) {
            //left Bottom
            if (!isGiantBall) ball.posY = ball.radius + brick.posY + brick.h + 1; //out ball
            brickStatusUpdate(brick, sens, -gravity);
            continue;
            //gravity = Math.abs(gravity);
            //sens    = (sens>0)? -sens : sens;
          } else if (
            brick.posX + brick.l >= ball.posX - ball.radius &&
            brick.posX + brick.l <= ball.posX
          ) {
            //Right Bottom
            if (!isGiantBall) ball.posY = ball.radius + brick.posY + brick.h + 1; //out ball
            brickStatusUpdate(brick, sens, -gravity);
            continue;
            //gravity = Math.abs(gravity);
            //sens    = (sens<0)? -sens : sens;
          }

        //******************Brick Corner Top*********************************************/
        if (
          brick.posY >= ball.posY &&
          brick.posY <= ball.posY + ball.radius &&
          brick.status > 0
        )
          if (brick.posX >= ball.posX && brick.posX <= ball.posX + ball.radius) {
            //ball in Top Corner

            //Left Top
            if (!isGiantBall) ball.posY = brick.posY - ball.radius - 1;
            brickStatusUpdate(brick, sens, -gravity);
            continue;
            //gravity = -Math.abs(gravity);
            //sens    = (sens>0)? -sens : sens;
          } else if (
            brick.posX + brick.l >= ball.posX - ball.radius &&
            brick.posX + brick.l <= ball.posX
          ) {
            //Right Top
            if (!isGiantBall) ball.posY = brick.posY - ball.radius - 1;
            brickStatusUpdate(brick, sens, -gravity);
            continue;
            //gravity = -Math.abs(gravity);
            //sens    = (sens<0)? -sens : sens;
          }

        //***************Brick Vertical Sides*******************************************/
        if (
          ball.posY > brick.posY &&
          ball.posY < brick.posY + brick.h &&
          brick.status > 0
        ) {
          //ball between brick.h
          if (
            ball.posX + ball.radius >= brick.posX &&
            ball.posX + ball.radius < brick.posX + marge
          ) {
            //left brick side
            if (!isGiantBall) ball.posX = brick.posX - ball.radius - 1;
            brickStatusUpdate(brick, -sens, gravity);
            continue;
          }

          if (
            ball.posX - ball.radius <= brick.posX + brick.l && //out ball of brick
            ball.posX - ball.radius > brick.posX + brick.l - marge
          ) {
            //right side
            if (!isGiantBall) ball.posX = brick.posX + brick.l + ball.radius + 1; //out ball of brick
            brickStatusUpdate(brick, -sens, gravity);
            continue;
          }
        }
      }
  }

  //*********************Scroll Brick Functions******************************** */
  function brickScrollX() {
    //scroll Brick in X
    if (scrollX == true) {
      let breakStatus = false; // to go out first for

      for (let line of tabBricks) {
        if (breakStatus == true) break;
        else {
          for (let brick of line) {
            if (
              (brick.posX <= 0 || brick.posX + brick.l >= canvasW) &&
              brick.status > 0
            ) {
              sensBrick = -sensBrick;
              breakStatus = true;
              break;
            }
          }
        }
      }

      for (let line of tabBricks) for (let brick of line) brick.posX += sensBrick;
    }
  }

  function brickScrollY() {
    //scroll Brick in Y
    if (scrollY === true && beginScrollY === true) {
      let breakStatus = false; // to go out first for

      for (let line of tabBricks) {
        if (breakStatus == true) break;

        for (let brick of line) {
          if (brick.status > 0) {
            if (brick.posY + brick.h >= canvasH - paddle.h) {
              //ground
              gravityBrick = -gravityBrick * 10;
              losingLife();
              if (scrollTimeout) clearTimeout(scrollTimeout);
              scrollTimeout = setTimeout(() => (gravityBrick = gravityBrick / 10), 250);
              break;
            } else if (brick.posY <= 0) {
              //roof
              gravityBrick = -gravityBrick;
              break;
            }
          }
        }
      }

      for (let line of tabBricks) for (let brick of line) brick.posY -= gravityBrick;
    }
  }

  function bricksAnimation() {
    brickScrollX();
    brickScrollY();
  }

  /************************************Function Bricks Powers***********************/

  // --- Nouvelle gestion des powers ---
  const activePowers = {
    speed: null,
    slow: null,
    paddleBig: null,
    paddleSmall: null,
    paddleSlow: null,
    paddleFast: null,
    ballBig: null,
    ballSmall: null,
    extraBall: null,
    random: null,
    fire: null,
    powder: null,
    finalFlash: null,
    scroll: null,
  };

  // Timers additionnels
  let victoryInterval = null;
  let finalFlashInterval = null;
  let extraBallInterval = null;
  let scrollTimeout = null;
  let ballResizeInterval = null; // animation générique de taille de balle (rétrécissement/agrandissement)

  // Valeurs par défaut
  const defaultState = {
    paddleSpeed: 10,
    paddleColor: 'blue',
    paddleL: 120,
    ballColor: 'red',
    ballRadius: sizeBall,
    musicRate: 1,
    sens: 2.5,
    gravity: 4,
  };

  // S'assure que la balle reste entièrement dans l'écran après un changement de rayon
  function enforceBallInside() {
    if (ball.posX - ball.radius < 0) ball.posX = ball.radius + 1;
    if (ball.posX + ball.radius > canvasW) ball.posX = canvasW - ball.radius - 1;
    if (ball.posY - ball.radius < 0) ball.posY = ball.radius + 1;
    if (ball.posY + ball.radius > canvasH) ball.posY = canvasH - ball.radius - 1;
  }

  // Animation générique du rayon de la balle vers une cible
  function animateBallTo(targetRadius, step = 1, tickMs = 10, maxTicks = 1000) {
    if (ballResizeInterval) {
      clearInterval(ballResizeInterval);
      ballResizeInterval = null;
    }
    // Si déjà à la taille, rien à faire
    if (ball.radius === targetRadius) return;

    const direction = ball.radius > targetRadius ? -1 : 1; // -1 pour rétrécir, 1 pour agrandir
    let ticks = 0;
    ballResizeInterval = setInterval(() => {
      ball.radius += direction * step;
      ticks++;
      // Après chaque changement de rayon, recaler la position si elle sort de l'écran
      if (direction > 0) {
        enforceBallInside();
      }
      // bornes et arrêt
      if (
        (direction < 0 && ball.radius <= targetRadius) ||
        (direction > 0 && ball.radius >= targetRadius) ||
        ticks >= maxTicks
      ) {
        ball.radius = targetRadius;
        // Recalage final
        if (direction > 0) {
          enforceBallInside();
        }
        clearInterval(ballResizeInterval);
        ballResizeInterval = null;
      }
    }, tickMs);
  }

  // Gestion de priorité pour les powers de vitesse du paddle (dernier power actif l'emporte)
  let paddlePowerSeq = 0; // compteur global
  let paddleSlowSeq = 0; // numéro de séquence du dernier slow appliqué
  let paddleFastSeq = 0; // numéro de séquence du dernier fast appliqué

  function applyCurrentPaddleSpeedEffect() {
    const slowActive = !!activePowers.paddleSlow;
    const fastActive = !!activePowers.paddleFast;

    if (slowActive && fastActive) {
      // le plus récent (seq plus grand) gagne
      if (paddleFastSeq > paddleSlowSeq) {
        paddleSpeed = 15;
        paddle.color = 'purple';
      } else {
        paddleSpeed = 5;
        paddle.color = 'burlyWood';
      }
    } else if (slowActive) {
      paddleSpeed = 5;
      paddle.color = 'burlyWood';
    } else if (fastActive) {
      paddleSpeed = 15;
      paddle.color = 'purple';
    } else {
      // aucun power actif
      paddleSpeed = defaultState.paddleSpeed;
      paddle.color = defaultState.paddleColor;
    }
  }

  // Fonction pour nettoyer tous les timers actifs
  function clearAllTimers() {
    // Clear tous les timeouts des powers
    Object.keys(activePowers).forEach((key) => {
      if (activePowers[key]) {
        clearTimeout(activePowers[key]);
        activePowers[key] = null;
      }
    });

    // Clear les intervals
    if (victoryInterval) {
      clearInterval(victoryInterval);
      victoryInterval = null;
    }
    if (finalFlashInterval) {
      clearInterval(finalFlashInterval);
      finalFlashInterval = null;
    }
    if (extraBallInterval) {
      clearInterval(extraBallInterval);
      extraBallInterval = null;
    }
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
      scrollTimeout = null;
    }
    if (ballResizeInterval) {
      clearInterval(ballResizeInterval);
      ballResizeInterval = null;
    }

    // Réapplique la bonne vitesse du paddle (revient par défaut car plus aucun power actif)
    applyCurrentPaddleSpeedEffect();

    // Restaure aussi la balle à l'état par défaut (taille/couleur)
    ball.radius = defaultState.ballRadius;
    ball.color = defaultState.ballColor;
    music.playbackRate = defaultState.musicRate;
  }

  function restorePower(prop) {
    switch (prop) {
      case 'speed':
        // Restaure la vitesse de la balle
        sens = sens >= 0 ? defaultState.sens : -defaultState.sens;
        gravity = gravity >= 0 ? defaultState.gravity : -defaultState.gravity;
        music.playbackRate = defaultState.musicRate;
        // Ne change la couleur que si aucun autre power de couleur n'est actif
        if (activePowers.slow) ball.color = 'snow';
        else if (activePowers.random) ball.color = 'paleGreen';
        else if (activePowers.ballBig) ball.color = 'darkGreen';
        else if (activePowers.ballSmall) ball.color = 'black';
        else if (activePowers.powder) ball.color = 'white';
        else ball.color = defaultState.ballColor;
        break;
      case 'slow':
        // Restaure la vitesse de la balle
        sens = sens >= 0 ? defaultState.sens : -defaultState.sens;
        gravity = gravity >= 0 ? defaultState.gravity : -defaultState.gravity;
        music.playbackRate = defaultState.musicRate;
        // Ne change la couleur que si aucun autre power de couleur n'est actif
        if (activePowers.speed) ball.color = 'firebrick';
        else if (activePowers.random) ball.color = 'paleGreen';
        else if (activePowers.ballBig) ball.color = 'darkGreen';
        else if (activePowers.ballSmall) ball.color = 'black';
        else if (activePowers.powder) ball.color = 'white';
        else ball.color = defaultState.ballColor;
        break;
      case 'fire':
        // Restaure la vitesse de la balle
        sens = sens >= 0 ? defaultState.sens : -defaultState.sens;
        gravity = gravity >= 0 ? defaultState.gravity : -defaultState.gravity;
        music.playbackRate = defaultState.musicRate;
        // Ne change la couleur que si aucun autre power de couleur n'est actif
        if (activePowers.slow) ball.color = 'snow';
        else if (activePowers.random) ball.color = 'paleGreen';
        else if (activePowers.ballBig) ball.color = 'darkGreen';
        else if (activePowers.ballSmall) ball.color = 'black';
        else if (activePowers.powder) ball.color = 'white';
        else ball.color = defaultState.ballColor;
        break;
      case 'random':
        // Restaure la vitesse de la balle
        sens = sens >= 0 ? defaultState.sens : -defaultState.sens;
        gravity = gravity >= 0 ? defaultState.gravity : -defaultState.gravity;
        music.playbackRate = defaultState.musicRate;
        // Ne change la couleur que si aucun autre power de couleur n'est actif
        if (activePowers.speed) ball.color = 'firebrick';
        else if (activePowers.slow) ball.color = 'snow';
        else if (activePowers.ballBig) ball.color = 'darkGreen';
        else if (activePowers.ballSmall) ball.color = 'black';
        else if (activePowers.powder) ball.color = 'white';
        else ball.color = defaultState.ballColor;
        break;
      case 'paddleBig':
        // Le power d'agrandissement est permanent, pas de restauration
        break;
      case 'paddleSmall':
        // Le power de rétrécissement est permanent, pas de restauration
        break;
      case 'paddleSlow':
        // La restauration standard passe maintenant par applyCurrentPaddleSpeedEffect
        applyCurrentPaddleSpeedEffect();
        break;
      case 'paddleFast':
        // La restauration standard passe maintenant par applyCurrentPaddleSpeedEffect
        applyCurrentPaddleSpeedEffect();
        break;
      case 'ballBig':
        // Restaure la taille normale avec une animation de rétrécissement
        if (ball.radius > defaultState.ballRadius) {
          animateBallTo(defaultState.ballRadius, 1, 10, 1000);
        } else {
          ball.radius = defaultState.ballRadius;
        }
        if (activePowers.ballSmall) ball.color = 'black';
        else ball.color = defaultState.ballColor;
        break;
      case 'ballSmall':
        // Restaure la taille normale avec une animation douce
        if (ball.radius < defaultState.ballRadius) {
          animateBallTo(defaultState.ballRadius, 1, 10, 1000);
        } else {
          ball.radius = defaultState.ballRadius;
        }
        if (activePowers.ballBig) ball.color = 'darkGreen';
        else ball.color = defaultState.ballColor;
        break;
      case 'extraBall':
        // Restaure le mouvement de la balle, garde la couleur CYAN pendant toute l'animation de retour
        if (!beginGame) {
          sens = sens >= 0 ? defaultState.sens : -defaultState.sens;
          gravity = gravity >= 0 ? defaultState.gravity : -defaultState.gravity;
        }
        // Animation de rétrécissement, et reset de la couleur une fois terminé
        {
          let shrinkCount = 0;
          const shrinkInterval = setInterval(() => {
            if (ball.radius > defaultState.ballRadius) {
              ball.radius -= 1;
              shrinkCount++;
            } else {
              ball.radius = defaultState.ballRadius;
              clearInterval(shrinkInterval);
              // Ne remettre la couleur par défaut que si aucun autre power de balle n'est actif
              const otherBallColorPowerActive =
                activePowers.ballBig ||
                activePowers.ballSmall ||
                activePowers.speed ||
                activePowers.slow ||
                activePowers.random ||
                activePowers.powder;
              if (!otherBallColorPowerActive) {
                ball.color = defaultState.ballColor;
                paddle.color = defaultState.paddleColor;
              }
              info.textContent = '';
              // Fin effective du power Extra Ball
              activePowers.extraBall = null;
            }
            if (shrinkCount > 70) {
              clearInterval(shrinkInterval);
              // filet de sécurité si boucle interrompue
              if (ball.radius < defaultState.ballRadius)
                ball.radius = defaultState.ballRadius;
            }
          }, 10);
        }
        // On ne passe pas par le reset générique ici; on attend la fin de l'animation
        return;
      case 'finalFlash':
        // Conserver la couleur GOLD jusqu'à la fin de l'animation de retour
        {
          let flashShrinkCount = 0;
          const flashShrinkInterval = setInterval(() => {
            if (ball.radius > defaultState.ballRadius) {
              ball.radius -= 2; // Plus rapide pour giant ball
              flashShrinkCount++;
            } else {
              ball.radius = defaultState.ballRadius;
              clearInterval(flashShrinkInterval);
              // Ne remettre la couleur par défaut que si aucun autre power couleur n'est actif
              const otherBallColorPowerActive =
                activePowers.ballBig ||
                activePowers.ballSmall ||
                activePowers.speed ||
                activePowers.slow ||
                activePowers.random ||
                activePowers.powder;
              if (!otherBallColorPowerActive) {
                ball.color = defaultState.ballColor;
                paddle.color = defaultState.paddleColor;
              }
              // Restaure la longueur du paddle à la fin de l'effet
              paddle.l -= 20;
              info.textContent = '';
              activePowers.finalFlash = null;
            }
            if (flashShrinkCount > 230) {
              clearInterval(flashShrinkInterval);
              if (ball.radius < defaultState.ballRadius)
                ball.radius = defaultState.ballRadius;
            }
          }, 10);
        }
        // On ne passe pas par le reset générique ici; on attend la fin de l'animation
        return;
      case 'scroll':
        // rien à restaurer
        break;
      case 'powder':
        ball.color = defaultState.ballColor;
        paddle.color = defaultState.paddleColor;
        break;
    }
    info.textContent = '';
    activePowers[prop] = null;
  }

  function power(brick) {
    // --- Gestion indépendante de chaque power ---

    // firebrick : accélère la balle
    if (brick.color == 'firebrick') {
      if (activePowers.speed) clearTimeout(activePowers.speed);
      sens = sens >= 0 ? 4.5 : -4.5;
      music.playbackRate = 1.4;
      ball.color = 'firebrick';
      info.textContent = 'Faster!!!';
      activePowers.speed = setTimeout(() => restorePower('speed'), 5000);
    }

    // snow : ralentit la balle
    if (brick.color == 'snow') {
      if (activePowers.slow) clearTimeout(activePowers.slow);
      sens = sens >= 0 ? 1.5 : -1.5;
      gravity = gravity >= 0 ? 2 : -2;
      music.playbackRate = 0.8;
      ball.color = 'snow';
      info.textContent = 'Slower!!!';
      activePowers.slow = setTimeout(() => restorePower('slow'), 5000);
    }

    // chartreuse : la balle s'arrête puis repart dans une direction aléatoire
    if (brick.color == 'chartreuse') {
      if (activePowers.random) clearTimeout(activePowers.random);
      sens = 0;
      gravity = 1;
      ball.color = 'paleGreen';
      info.textContent = 'Hey ball! what are you doing?';
      activePowers.random = setTimeout(() => {
        random.play();
        sens = (Math.random() * 5 + 1) * Math.pow(-1, Math.random().toFixed(1) * 10);
        gravity = 4;
        ball.color = 'red';
        info.textContent = '';
        restorePower('random');
      }, 1000);
    }

    // yellow : agrandit la raquette (permanent et cumulable)
    if (brick.color == 'yellow') {
      bigger.play();
      paddle.l += 20;
      paddle.color = 'yellow';
      info.textContent = 'Yeah, paddle is bigger!';
      setTimeout(() => {
        info.textContent = '';
      }, 2000);
    }

    // dimGray : rétrécit la raquette (permanent et cumulable)
    if (brick.color == 'dimGray') {
      smaller.play();
      paddle.l -= 10;
      paddle.color = 'dimGray';
      info.textContent = 'What!!!, paddle is smaller!';
      setTimeout(() => {
        info.textContent = '';
      }, 2000);
    }

    // burlyWood : ralentit la raquette (10s) — dernier power appliqué prévaut
    if (brick.color == 'burlyWood') {
      if (activePowers.paddleSlow) clearTimeout(activePowers.paddleSlow);
      info.textContent = 'Nooo! Paddle is slower!';
      // Met à jour la priorité
      paddlePowerSeq++;
      paddleSlowSeq = paddlePowerSeq;
      // Programme l'expiration à 10s
      activePowers.paddleSlow = setTimeout(() => {
        activePowers.paddleSlow = null; // ce power n'est plus actif
        restorePower('paddleSlow');
      }, 10000);
      // Applique l'effet courant en tenant compte de la priorité
      applyCurrentPaddleSpeedEffect();
    }

    // purple : accélère la raquette (10s) — dernier power appliqué prévaut
    if (brick.color == 'purple') {
      if (activePowers.paddleFast) clearTimeout(activePowers.paddleFast);
      info.textContent = 'Paddle is faster!';
      // Met à jour la priorité
      paddlePowerSeq++;
      paddleFastSeq = paddlePowerSeq;
      // Programme l'expiration à 10s
      activePowers.paddleFast = setTimeout(() => {
        activePowers.paddleFast = null; // ce power n'est plus actif
        restorePower('paddleFast');
      }, 10000);
      // Applique l'effet courant en tenant compte de la priorité
      applyCurrentPaddleSpeedEffect();
    }

    // darkGreen : agrandit la balle
    if (brick.color == 'darkGreen') {
      if (activePowers.ballBig) clearTimeout(activePowers.ballBig);
      ball.radius = 20;
      ball.color = 'darkGreen';
      info.textContent = "What's that? a big ball?!";
      enforceBallInside();
      activePowers.ballBig = setTimeout(() => restorePower('ballBig'), 5000);
    }

    // black : rétrécit la balle (animation de rétrécissement)
    if (brick.color == 'black') {
      if (activePowers.ballSmall) clearTimeout(activePowers.ballSmall);
      ballSmall.play();
      // Anime la réduction de la taille jusqu'à 4
      animateBallTo(4, 1, 10, 1000);
      ball.color = 'black';
      info.textContent = "What's that? a small ball?!";
      activePowers.ballSmall = setTimeout(() => restorePower('ballSmall'), 5000);
    }

    // hotpink : vie supplémentaire
    if (brick.color == 'hotpink') {
      life++;
      heartUpdate();
      info.textContent = 'Yeah! Extra Life!';
      extraLife.play();
      // Pas de reset global
      setTimeout(() => {
        info.textContent = '';
      }, 2000);
    }

    // powderBlue : la balle revient sur la raquette
    if (brick.color == 'powderBlue') {
      // Si Extra Ball ou Final Flash sont actifs, ignorer PowderBlue (la balle doit rester à sa place)
      if (activePowers.extraBall || activePowers.finalFlash) {
        info.textContent = 'Not now...';
        setTimeout(() => (info.textContent = ''), 1200);
        return;
      }
      launch.play();
      info.textContent = 'Yeah! The ball on me!';
      ball.color = 'white';
      paddle.color = 'powderBlue';
      beginGame = false;
      init();
      if (activePowers.powder) clearTimeout(activePowers.powder);
      activePowers.powder = setTimeout(() => restorePower('powder'), 5000);
      document.body.onkeyup = (e) => {
        if (e.key == ' ') restorePower('powder');
      };
    }

    // red : la balle devient géante (Final Flash)
    if (brick.color == 'red') {
      // Annule tous les powers en cours sur la balle
      // Annule PowderBlue si actif pour éviter le retour sur la raquette
      if (activePowers.powder) {
        clearTimeout(activePowers.powder);
        activePowers.powder = null;
        restorePower('powder');
      }
      document.body.onkeyup = null;
      if (activePowers.speed) {
        clearTimeout(activePowers.speed);
        activePowers.speed = null;
      }
      if (activePowers.slow) {
        clearTimeout(activePowers.slow);
        activePowers.slow = null;
      }
      if (activePowers.ballBig) {
        clearTimeout(activePowers.ballBig);
        activePowers.ballBig = null;
      }
      if (activePowers.ballSmall) {
        clearTimeout(activePowers.ballSmall);
        activePowers.ballSmall = null;
      }
      if (activePowers.random) {
        clearTimeout(activePowers.random);
        activePowers.random = null;
      }
      if (activePowers.extraBall) {
        clearTimeout(activePowers.extraBall);
        activePowers.extraBall = null;
      }

      if (activePowers.finalFlash) clearTimeout(activePowers.finalFlash);
      // Fige la balle à sa position actuelle (ne pas appeler init() qui repositionne)
      sens = 0;
      gravity = 0;
      beginGame = true; // Empêche init() de repositionner la balle
      finalflash.play();
      info.textContent = 'Final Flash!!!';
      ball.color = 'gold';
      paddle.color = 'red';
      paddle.l += 20;
      let flashCount = 0;
      if (finalFlashInterval) clearInterval(finalFlashInterval);
      finalFlashInterval = setInterval(() => {
        ball.radius += 1;
        flashCount++;
        enforceBallInside();
        if (ball.radius >= 230 || flashCount > 220) {
          clearInterval(finalFlashInterval);
          finalFlashInterval = null;
        }
      }, 10);
      activePowers.finalFlash = setTimeout(() => restorePower('finalFlash'), 2000);
    }

    // cyan : la balle grossit, s'arrête, puis repart (Extra Ball)
    if (brick.color == 'cyan') {
      // Annule tous les powers en cours sur la balle
      // Annule PowderBlue si actif pour éviter le retour sur la raquette
      if (activePowers.powder) {
        clearTimeout(activePowers.powder);
        activePowers.powder = null;
        restorePower('powder');
      }
      document.body.onkeyup = null;
      if (activePowers.speed) {
        clearTimeout(activePowers.speed);
        activePowers.speed = null;
      }
      if (activePowers.slow) {
        clearTimeout(activePowers.slow);
        activePowers.slow = null;
      }
      if (activePowers.ballBig) {
        clearTimeout(activePowers.ballBig);
        activePowers.ballBig = null;
      }
      if (activePowers.ballSmall) {
        clearTimeout(activePowers.ballSmall);
        activePowers.ballSmall = null;
      }
      if (activePowers.random) {
        clearTimeout(activePowers.random);
        activePowers.random = null;
      }
      if (activePowers.finalFlash) {
        clearTimeout(activePowers.finalFlash);
        activePowers.finalFlash = null;
      }

      if (activePowers.extraBall) clearTimeout(activePowers.extraBall);
      // Fige la balle immédiatement à sa position actuelle
      sens = 0;
      gravity = 0;
      beginGame = true; // Empêche init() de repositionner la balle
      rasengan.play();
      info.textContent = 'Rasen Gan!!!';
      ball.color = 'cyan';
      paddle.color = 'red';
      let extraCount = 0;
      if (extraBallInterval) clearInterval(extraBallInterval);
      extraBallInterval = setInterval(() => {
        ball.radius += 1;
        extraCount++;
        enforceBallInside();
        if (ball.radius >= 70 || extraCount > 70) {
          clearInterval(extraBallInterval);
          extraBallInterval = null;
        }
      }, 10);
      // Après 1.5s, on restaure le mouvement
      activePowers.extraBall = setTimeout(() => {
        restorePower('extraBall');
        // Si la balle est toujours figée, on relance le mouvement
        if (sens === 0 && gravity === 0) {
          sens = defaultState.sens;
          gravity = defaultState.gravity;
        }
      }, 1500);
    }

    // thistle : inverse le scroll vertical des briques
    if (brick.color == 'thistle') {
      info.textContent = 'Stop the Scroll, please!';
      gravityBrick = -gravityBrick;
      if (activePowers.scroll) clearTimeout(activePowers.scroll);
      activePowers.scroll = setTimeout(() => restorePower('scroll'), 3000);
    }
  }

  /*****************************End of onload**********************/
};
