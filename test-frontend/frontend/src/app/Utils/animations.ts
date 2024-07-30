import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
    state('void', style({
      opacity: 0,
    })),
    transition(':enter', [
      animate('200ms ease-out', style({
        opacity: 1,

      }))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({
        opacity: 0,
      }))
    ])
  ]);