/* 
author: Fivos Tzavellos
date: 17/10/2022
*/

//individual arrays that contain the three groups (scissors, papers, rocks)
let scissors = [];
let rocks = [];
let papers = [];

let elements = []; //the array that contains all 3 groups

// image objects
let scImg;
let rcImg;
let prImg;

const LENGTH = 50;

// load the transparent images for each group
function preload() {
  scImg = loadImage("scissors.png");
  rcImg = loadImage("rock.png");
  prImg = loadImage("paper.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //create LENGTH * 3 instances of objects with fixed starting positions and radii and random speed vectors
  for (let i = 0; i < LENGTH; i++) {
    scissors[i] = new Scissor(
      10 + i * 15,
      10 + i * 15,
      random(1, 2) * random([-1, 1]),
      random(1, 2) * random([-1, 1]),
      20
    );
    rocks[i] = new Rock(
      width - i * 15,
      width - i * 15,
      random(1, 2) * random([-1, 1]),
      random(1, 2) * random([-1, 1]),
      20
    );
    papers[i] = new Paper(
      height - i * 15,
      15,
      random(1, 2) * random([-1, 1]),
      random(1, 2) * random([-1, 1]),
      20
    );
  }

  //push all three groups into a single array
  elements.push(...scissors, ...rocks, ...papers);
}

function draw() {
  //greyish background so we can see all three groups
  background(210);

  //display and move each element
  for (let i = 0; i < elements.length; i++) {
    elements[i].show();
    elements[i].move();
  }

  collides(elements);
}

//function that calculates the distances between two elements and returns true if said distance is less than 20 pixels (will be used for collision detection)

function distance(element1, element2) {
  let d = sqrt((element1.x - element2.x) ** 2 + (element1.y - element2.y) ** 2);
  if (d < 20) {
    return 1;
  }
}

//function that does collision detection and resolution (paper wins over rock, scissor wins over paper, rock wins over scissor)

function collides(elements) {
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      if (distance(elements[i], elements[j])) {
        if (elements[i] instanceof Rock) {
          //if the first one is Rock
          if (elements[j] instanceof Scissor) {
            //if one is rock two is scissors
            //the scissors element becomes a rock with the position and velocity of the scissor
            elements[j] = new Rock(
              elements[j].x,
              elements[j].y,
              elements[j].v_x,
              elements[j].v_y,
              elements[j].r
            );
          } else if (elements[j] instanceof Paper) {
            //if one is rock two is paper
            //the rock element becomes paper
            elements[i] = new Paper(
              elements[i].x,
              elements[i].y,
              elements[i].v_x,
              elements[i].v_y,
              elements[i].r
            );
          }
        } else if (elements[i] instanceof Scissor) {
          //if one is scissor
          if (elements[j] instanceof Paper) {
            //if one is scissor two is paper
            //the paper element becomes rock
            elements[j] = new Scissor(
              elements[j].x,
              elements[j].y,
              elements[j].v_x,
              elements[j].v_y,
              elements[j].r
            );
          } else if (elements[j] instanceof Rock) {
            //if one is scissor two is rock
            //the scissor element becomes rock
            elements[i] = new Rock(
              elements[i].x,
              elements[i].y,
              elements[i].v_x,
              elements[i].v_y,
              elements[i].r
            );
          }
        } else if (elements[i] instanceof Paper) {
          //if one is paper
          if (elements[j] instanceof Rock) {
            //if one is paper and two is rock
            //the rock element becomes paper
            elements[j] = new Paper(
              elements[j].x,
              elements[j].y,
              elements[j].v_x,
              elements[j].v_y,
              elements[j].r
            );
          } else if (elements[j] instanceof Scissor) {
            //if one is paper and two is scissors
            //the paper element becomes scissor
            elements[i] = new Scissor(
              elements[i].x,
              elements[i].y,
              elements[i].v_x,
              elements[i].v_y,
              elements[i].r
            );
          }
        }
      }
    }
  }
}
