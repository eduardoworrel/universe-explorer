import Character from './Character';
import Friends from './Friends';
import Universo from './Orbit/Universe';
const real = document.querySelector('#realcontent') as HTMLDivElement;
if (!real) throw new Error('O elemento "realcontent" é obrigatório');

const character = new Character(real);
character.start();
const friends = new Friends(real, character.character.id);
friends.start();

new Universo(real);
