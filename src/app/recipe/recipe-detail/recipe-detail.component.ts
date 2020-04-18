import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/shared.model';
import * as shoppingActions from '../../shopping/store/shopping-list.action';
import * as fromAppReducer from '../../store/app.reducer';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as recipeAction from '../store/recipe.action';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeWasSelected: Recipe;
  recipes: Observable<{ recipes: Recipe[] }>;
  notificationMessage = null;
  id: number;

  constructor(private router: Router,
              private rout: ActivatedRoute,
              private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    console.log('recipe data ' + this.recipeWasSelected);

    this.rout.params.pipe(map(params => {
      return +params['id'];
    }), switchMap( id => {
      this.id = id;
      return this.store.select('recipeState');
    }), map( recipeState => {
      return recipeState.recipes.find((recipes, index) => {
        return index === this.id;
      });
    })).subscribe(recipe => {
         this.recipeWasSelected = recipe;
         });

   /*  this.recipeSer.recipeAdd.subscribe((recipe: Recipe[]) => {
      this.recipeWasSelected = this.recipeSer.getRecipe()[this.id];
      console.log('recipe next');

    }); */

  }

  sendToShopping() {
    const ingNumber = this.recipeWasSelected.ingredients.length;
    this.notificationMessage = ' You have added ' + ingNumber + ' ingredients to shopping list ';
    setTimeout(() => {
      this.notificationMessage = null;
    }, 4000);

    this.store.dispatch(new shoppingActions.AddIngredients(this.recipeWasSelected.ingredients));
    // this.recipeSer.onShoppingEmit(this.recipeWasSelected.ingredients);
  }
  editRecipe() {
    const currentUser = JSON.parse(localStorage.getItem('userData')).email;
    if (currentUser !== this.recipeWasSelected.username) {
      this.notificationMessage = ' you cant edit: You DO NOT own this recipe!!';
      setTimeout(() => {
        this.notificationMessage = null;
      }, 4000);
      return;
    }
    // if you are really the owner
    this.router.navigate(['edit'], { relativeTo: this.rout });
  }

  onDelete() {
    /*  const currentUser = JSON.parse(localStorage.getItem('userData')).email;
     if (currentUser !== this.recipeWasSelected.username) {
       this.notificationMessage = ' you cant delete: You DO NOT own this recipe!!';
       setTimeout(() => {
         this.notificationMessage = null;
       }, 4000);
       return;
     } */
    //this.recipeSer.deleteRecipe(this.id);
    this.store.dispatch( new recipeAction.DeleteRecipe(this.id));
    this.router.navigate(['/recipe']);
  }
}
