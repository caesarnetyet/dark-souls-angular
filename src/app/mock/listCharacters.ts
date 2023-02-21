import {Model} from "../interfaces/model";
import {Character} from "../interfaces/character";

export const LIST_CHARACTERS: Model<Character>[] = [{
  "id": 1,
  "model": {"name": "Pedro", "class": "Alchemist"},
  "actions": {"delete_url": "#", "update_url": "#"}
}, {
  "id": 2,
  "model": {"name": "Maria", "class": "Wizard"},
  "actions": {"delete_url": "#", "update_url": "#"}
}, {
  "id": 3,
  "model": {"name": "Juan", "class": "Warrior"},
  "actions": {"delete_url": "#", "update_url": "#"}
}, {"id": 4, "model": {"name": "Julia", "class": "Rogue"}, "actions": {"delete_url": "#", "update_url": "#"}}, {
  "id": 5,
  "model": {"name": "Diego", "class": "Paladin"},
  "actions": {"delete_url": "#", "update_url": "#"}
}, {
  "id": 6,
  "model": {"name": "Gabriela", "class": "Cleric"},
  "actions": {"delete_url": "#", "update_url": "#"}
}, {
  "id": 7,
  "model": {"name": "Fernando", "class": "Druid"},
  "actions": {"delete_url": "#", "update_url": "#"}
}, {
  "id": 8,
  "model": {"name": "Luisa", "class": "Barbarian"},
  "actions": {"delete_url": "#", "update_url": "#"}
}, {
  "id": 9,
  "model": {"name": "Victor", "class": "Bard"},
  "actions": {"delete_url": "#", "update_url": "#"}
}, {"id": 10, "model": {"name": "Laura", "class": "Fighter"}, "actions": {"delete_url": "#", "update_url": "#"}}]
