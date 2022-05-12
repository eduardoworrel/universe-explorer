import { WatchMove } from '../Move/config/WatchMove';

export function setAlertStyle(name: string, img: string) {
  const alert = document.querySelector(`#${name} .alert`) as HTMLElement;
  alert.style.backgroundImage = `url('${img}')`;
  alert.style.backgroundSize = '100%';
  alert.style.padding = '5px';
  alert.style.width = '50%';
  alert.style.height = '50%';
  alert.style.margin = '0 auto';
  alert.style.borderRadius = '50%';
  alert.style.boxShadow = ' 0px 0px 25px 8px white';
  alert.style.backgroundColor = '#ffffffb3';
}
export class Interactive {
  interactiveContext = document.getElementById('interactive-content') as HTMLElement;
  alerts = document.querySelectorAll('.alert');
  closes = document.querySelectorAll('.close');
  character: HTMLElement;
  visible: string = '';
  control: WatchMove;
  lastInterval: any;
  triggerElement: HTMLElement;
  lockInterval: any;
  visited: string[] = [];
  descovery: HTMLElement;
  constructor(character: HTMLElement, control: WatchMove) {
    this.control = control;
    this.character = character;

    this.watchDiscovery();
  }
  start() {
    for (const close of Array.from(this.closes)) {
      close.addEventListener('click', () => {
        this.visible = '';
        Array.from(this.interactiveContext.querySelectorAll('div')).forEach((element: HTMLElement) => {
          element.style.display = 'none';
        });
        this.triggerElement.style.display = 'block';
        this.interactiveContext.style.display = 'none';
        this.interactiveContext.style.pointerEvents = 'none';
        this.interactiveContext.classList.remove('locked');
      });
    }
    for (const alert of Array.from(this.alerts)) {
      alert.addEventListener('click', () => {
        const content = alert.parentElement?.querySelector('.alert-toShow') as HTMLElement;
        content.style.display = 'block';
        (alert as HTMLElement).style.display = 'none';
        this.visible = 'lock';
        this.interactiveContext.classList.add('locked');
        if (!this.visited.includes(alert.parentElement?.id as string)) {
          this.visited.push(alert.parentElement?.id as string);
        }
        this.descovery.innerHTML = `
        <b>Você explorou ${this.visited.length} de ${this.alerts.length} corpos celestes</b>
       `;
      });
    }
    this.watch();
  }
  watch() {
    setInterval(() => {
      if (this.visible === 'lock') {
        if (this.triggerElement.style.display !== 'none') {
          this.triggerElement.style.display = 'none';
        }
        let vertical = parseFloat(this.triggerElement.style.top.replace('px', ''));
        let horizontal = parseFloat(this.triggerElement.style.left.replace('px', ''));
        vertical += parseFloat(this.triggerElement.style.width.replace('px', '')) / 2;
        horizontal += parseFloat(this.triggerElement.style.height.replace('px', '')) / 2;
        this.control.updateMove(vertical - 75, horizontal - 75);
      }

      if (this.visible !== '' && this.visible !== 'lock') {
        const BBoxB = this.character.getBoundingClientRect();
        const BBoxA = this.triggerElement.getBoundingClientRect();
        if (!this.rectIntersect(BBoxA, BBoxB)) {
          Array.from(this.interactiveContext.querySelectorAll('div')).forEach((element: HTMLElement) => {
            element.style.display = 'none';
          });
          this.visible = '';
          this.interactiveContext.style.display = 'none';
          this.interactiveContext.style.pointerEvents = 'none';
        }
      }

      if (this.visible === '') {
        const BBoxA = this.character.getBoundingClientRect();
        const intersectables = document.querySelectorAll('.trigger');
        for (const element of Array.from(intersectables)) {
          const BBoxB = element.getBoundingClientRect();

          if (this.rectIntersect(BBoxA, BBoxB)) {
            this.showThat(element as HTMLElement);
          }
        }
      }
    }, 20);
  }
  static watchYears(angle: number) {
    const div = document.querySelector('#days') as HTMLElement;

    const year = angle / 6.28;
    const days = Math.floor(year * 365);

    if (days > 365) {
      div.innerHTML = `
      <b>Você está aqui a ${days / 365 > 2 ? Math.floor(days / 365) + ' anos' : Math.floor(days / 365) + ' ano'} ${
        days % 365 > 1 ? 'e ' + (days % 365) + ' dias' : ''
      } </b>
     `;
    } else {
      div.innerHTML = `
      <b>Você está aqui a ${days} dias</b>
     `;
    }

    div.style.position = 'fixed';
    div.style.bottom = '3%';
    div.style.right = '5%';
    div.style.pointerEvents = 'none';
    div.style.color = 'white';
    div.style.fontSize = '30px';
  }
  watchDiscovery() {
    this.descovery = document.createElement('div') as HTMLElement;

    this.descovery.style.position = 'fixed';
    this.descovery.style.top = '3%';
    this.descovery.style.left = '5%';
    this.descovery.style.pointerEvents = 'none';
    this.descovery.style.color = 'white';
    this.descovery.style.fontSize = '30px';

    this.descovery.innerHTML = `
     <b>Você explorou 0 de ${this.alerts.length} corpos celestes</b>
    `;
    document.body.append(this.descovery);
  }
  showThat(triggerElement: HTMLElement) {
    if (this.visible === '') {
      for (const alert of Array.from(this.alerts)) {
        (alert as HTMLElement).style.display = 'block';
        const content = alert.parentElement?.querySelector('.alert-toShow') as HTMLElement;
        content.style.display = 'none';
      }
      this.visible = triggerElement.getAttribute('show') as string;
      this.triggerElement = triggerElement;

      const element = document.getElementById(this.visible) as HTMLElement;
      element.style.display = 'block';

      this.interactiveContext.style.display = 'block';
      this.interactiveContext.style.pointerEvents = 'auto';
    }
  }
  rangeIntersect = (min0: number, max0: number, min1: number, max1: number) =>
    Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1);
  rectIntersect = function (this: Interactive, r0, r1) {
    return (
      this.rangeIntersect(r0.left, r0.right, r1.left, r1.right) &&
      this.rangeIntersect(r0.top, r0.bottom, r1.top, r1.bottom)
    );
  };
}
