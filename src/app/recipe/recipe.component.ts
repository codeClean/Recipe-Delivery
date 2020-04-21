import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as fromAppRoot from '../store/app.reducer';
import * as recipeAction from './store/recipe.action';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  selectedRecipe: Recipe;

  notifyMessage: string;
  notify: boolean;
  // @Input() recipeWasSelected: Recipe ;
  constructor(private store: Store<fromAppRoot.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch( new recipeAction.FeatchRecipe());
  }
}
