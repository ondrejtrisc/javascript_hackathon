export default class Entity {
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