import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {Recipe} from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Store } from '@ngrx/store';
import * as fromAppRoot from '../../store/app.reducer';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {

 @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe [];
  recipeSubscription: Subscription;
  notifyMessage: string;
  notify: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromAppRoot.AppState>) {
    // console.log('test reecipe ' + this.recipes[0].description);
  }
  ngOnDestroy(): void {
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
     this.recipeSubscription =  this.store.select('recipeState').pipe(map(responseData =>
       responseData.recipes
    )).subscribe((recipes: Recipe[]) => {
    // console.log(recipes);

      if (this.router.url === '/recipe/myrecipe') { console.log('url is myrecipe'); } else {console.log(' cant find url');
    }

      this.notifyMessage = ' you have new  ' + recipes.length + ' recipe/s ';
      this.notify = true;
      setTimeout(() => {
        this.notify = false;
    }, 4000);
      this.recipes = recipes;
    // this.recipes = null;
    });
   // this.recipes = this.recipeSer.getRecipe();
  }

  newRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
