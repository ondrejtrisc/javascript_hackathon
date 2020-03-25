import Pacman from './Pacman.js';
import Stage from './Stage.js';
import Entity from './Entity.js';

document.addEventListener('DOMContentLoaded', () => {
  const stage = new Stage(11, 6);
  stage.mount();
  const pacman = new Pacman(0, 0, 0, stage);
  pacman.mount();

  fetch('http://bootcamp.podlomar.org/api/pacman?width=11&height=6')
    .then(response => response.json())
    .then(json => {
      for (const wall of json.walls) {
        const entity = new Entity(wall.x, wall.y, 'wall', stage);
        entity.mount();
      }
      for (const apple of json.apples) {
        const entity = new Entity(apple.x, apple.y, 'apple', stage);
        entity.mount();
      }
      for (const bomb of json.bombs) {
        const entity = new Entity(bomb.x, bomb.y, 'bomb', stage);
        entity.mount();
      }
    });
});