import { Component, OnInit, Input } from '@angular/core';
import {Ingredient} from '../shared/shared.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as fromShoppingAction from './store/shopping-list.action';
import { state, trigger, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateY(-100px)',
            backgroundColor: 'green',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateY(-50px)',
            backgroundColor: '#9ACD32',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateY(-20px)',
            backgroundColor: '#9ACD32',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translateY(0px)',
            backgroundColor: 'green',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
      transition('* => void', [
        animate(1000, style({
          backgroundColor: 'darkred',
          transform: 'translateY(-100px)',
          opacity: 0,
          'z-index': 100
        }))
      ])
    ])
  ]
})
export class ShoppingListComponent implements OnInit {


  ingredients: Observable< {ingredients: Ingredient[]}>;
  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    // ngrx store select has its own automatic subscription:
    // ingredients updates itself in every change
    this.ingredients = this.store.select('shoppingList');
  }
  onEdit(index: number) {
    this.store.dispatch( new fromShoppingAction.StartEdit(index));
      //  this.shoppingService.editIngredient.next(index);
  }


}
