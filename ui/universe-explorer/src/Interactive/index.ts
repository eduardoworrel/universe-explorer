import { WatchMove } from '../Move/config/WatchMove';

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
  constructor(character: HTMLElement, control: WatchMove) {
    this.control = control;
    this.character = character;
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
      });
    }
    this.watch();
  }
  watch() {
    setInterval(() => {
      if (this.visible === 'lock') {
        if(this.triggerElement.style.display !== 'none') {
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
