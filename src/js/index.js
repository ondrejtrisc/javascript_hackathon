class Pacman {
  constructor (xpos, ypos, mouth, stage) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.mouth = mouth;
    this.maxX = stage.width;
    this.maxY = stage.height;
    this.stage = stage;
  }

  move(key) {    
    if (key === 'ArrowRight') {
      if (this.xpos < this.maxX-1 && this.stage.collisionDetection(this.xpos + 1, this.ypos).type !== 'wall'){
        this.xpos += 1;
        this.element.style.backgroundPositionY = '0';
      }
    }
    else if (key === 'ArrowLeft') {
      if (this.xpos > 0 && this.stage.collisionDetection(this.xpos - 1, this.ypos).type !== 'wall') {
        this.xpos -= 1;
        this.element.style.backgroundPositionY = '255px';
      }
    }
    else if (key === 'ArrowUp') {
      if (this.ypos > 0 && this.stage.collisionDetection(this.xpos, this.ypos - 1).type !== 'wall') {
        this.ypos -= 1;
        this.element.style.backgroundPositionY = '85px';
      }
    }
    else if (key === 'ArrowDown') {
      if (this.ypos < this.maxY-1 && this.stage.collisionDetection(this.xpos, this.ypos + 1).type !== 'wall'){
        this.ypos += 1;
        this.element.style.backgroundPositionY = '170px';
      }
    }
    if (this.stage.collisionDetection(this.xpos, this.ypos).type === 'apple') {
      this.stage.removeEntity(this.stage.collisionDetection(this.xpos, this.ypos));
    }
    if (this.stage.collisionDetection(this.xpos, this.ypos).type === 'bomb') {
      if(Math.random() < 0.5) {
        this.element.style.display = 'none';
        this.stage.removeEntity(this.stage.collisionDetection(this.xpos, this.ypos));
        const tomb = new Entity(this.xpos, this.ypos, 'tomb', this.stage);
        tomb.mount();
      }
    }
    this.update();
  }

  changeMouth() {
    if (this.mouth === '85px') {
      this.element.style.backgroundPositionX = '0';
      this.mouth = '0';
      }
    else {
      this.element.style.backgroundPositionX = '85px';
      this.mouth = '85px';
    }
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'entity entity--pac pacboy-active-light';
    
    document.addEventListener('keydown', event => {
      if(event.key === 'ArrowRight' || event.key === 'ArrowLeft' 
      || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        this.changeMouth();
        this.move(event.key);
      }
    });

    this.update();

    return this.element;
  }

  update() {
    // this.element = document.querySelector('.entity--pac');
    this.element.style.left = `${this.xpos * 85}px`;
    this.element.style.top = `${this.ypos * 85}px`;
  }

  mount() {
    const stageElem = document.querySelector('.stage');
    this.render();
    stageElem.appendChild(this.element);
  }
}

class Stage {
  constructor (width, height) {
    this.width = width;
    this.height = height;
    this.elementsArr = [];
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'stage';
    this.element.style.width = `${this.width * 85}px`;
    this.element.style.height = `${this.height * 85}px`;  }

  // update() {

  // }

  mount() {
    const contElem = document.querySelector('.container');
    this.render();
    contElem.appendChild(this.element);
  }

  collisionDetection(x, y) {
    for (let i = 0; i < this.elementsArr.length; i++) {
      if (this.elementsArr[i].x === x && this.elementsArr[i].y === y) {
        console.log(this.elementsArr[i].type)
        return this.elementsArr[i];
      }
    }
    return 'nothing';
  }

  removeEntity(entity) {
    this.elementsArr.splice(this.elementsArr.indexOf(entity), 1);
    entity.unmount();
  }
}

class Entity {
  constructor(x, y, type, stage) {
    this.x = x;
    this.y = y;
    this.type = type;
    stage.elementsArr.push(this);
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = `entity entity--${this.type}`;
    this.element.style.left = `${this.x * 85}px`;
    this.element.style.top = `${this.y * 85}px`;
  }

  // update() {

  // }

  mount() {
    const stageElem = document.querySelector('.stage');
    this.render();
    stageElem.appendChild(this.element);
  }

  unmount() {
    const stageElem = document.querySelector('.stage');
    stageElem.removeChild(this.element);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const stage = new Stage(12, 6);
  stage.mount();
  const pacman = new Pacman(0, 0, 0, stage);
  pacman.mount();
  // const apple = new Entity(3, 2, 'apple', stage);
  // apple.mount();
  // const wall = new Entity(2, 3, 'wall', stage);
  // wall.mount();
  // const wall2 = new Entity(0, 1, 'wall', stage);
  // wall2.mount();
  // const bomb = new Entity(4, 5, 'bomb', stage);
  // bomb.mount();
  // const tomb = new Entity(5, 4, 'tomb', stage);
  // tomb.mount();
  console.log(stage.elementsArr);


  
  fetch('http://bootcamp.podlomar.org/api/pacman?width=11&height=6')
    .then(response => response.json())
    .then(json => {
      console.log(json);

      for (const wall of json.walls) {
        const ent = new Entity(wall.x, wall.y, 'wall', stage);
        ent.mount();
      }
      for (const apple of json.apples) {
        const ent1 = new Entity(apple.x, apple.y, 'apple', stage);
        ent1.mount();
      }
      for (const bomb of json.bombs) {
        const ent = new Entity(bomb.x, bomb.y, 'bomb', stage);
        ent.mount();
      }
    });
});