/* eslint-disable no-unused-expressions */
import JoystickMove from './JoystickMove';
import KeyboardMove from './KeyboardMove';
import { position } from './config/positions';
import { Interactive } from '../Interactive';
import { WatchMove } from './config/WatchMove';
export default class Move {
  static attach(character: HTMLElement) {
    const control = new WatchMove(position, character);
    const joystick = new JoystickMove(control);
    const keyboard = new KeyboardMove(control);
    const interactive = new Interactive(character, control);
    joystick.start();
    keyboard.start();
    control.togglePressedKeyboard();
    interactive.start();
  }
}
