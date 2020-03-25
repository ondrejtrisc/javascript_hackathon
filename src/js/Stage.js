export default class Stage {
  constructor (width, height) {
    this.width = width;
    this.height = height;
    this.elementsArr = [];
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'stage';
    this.element.style.width = `${this.width * 85}px`;
    this.element.style.height = `${this.height * 85}px`;
  }

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