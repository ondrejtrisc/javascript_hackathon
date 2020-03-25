import Entity from './Entity.js';

export default class Pacman {
  constructor (xpos, ypos, mouth, stage) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.mouth = mouth;
    this.maxX = stage.width;
    this.maxY = stage.height;
    this.stage = stage;
    this.status = 'alive';
  }

  move(key) {
    if (this.status === 'dead') {
      return;
    }
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
        this.stage.removeEntity(this.stage.collisionDetection(this.xpos, this.ypos));
        const tomb = new Entity(this.xpos, this.ypos, 'tomb', this.stage);
        tomb.mount();
        this.unmount();
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
    this.element.className = 'entity entity--pac';
    
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
    this.element.style.left = `${this.xpos * 85}px`;
    this.element.style.top = `${this.ypos * 85}px`;
  }

  mount() {
    const stageElem = document.querySelector('.stage');
    this.render();
    stageElem.appendChild(this.element);
  }

  unmount() {
    const stageElem = document.querySelector('.stage');
    stageElem.removeChild(this.element);
    this.status = 'dead';
  }
}