import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';
<<<<<<< HEAD
import { Store } from '@ngrx/store';
import * as fromAppRoot from '../store/app.reducer';
import * as recipeAction from './store/recipe.action';
=======
import { DataStorageService } from '../shared/data-storage.service';
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f

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
<<<<<<< HEAD
  constructor(private store: Store<fromAppRoot.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch( new recipeAction.FeatchRecipe());
=======
  constructor(private dataServ: DataStorageService) { }

  ngOnInit(): void {
   /*  this.recipeSer.recipeWasSelected.subscribe(
    (recip: Recipe) => this.selectedRecipe = recip); */
/* 
      const result =  this.dataServ.fetchRecipe().subscribe(response => {
          if (!response) {
            this.notifyMessage = ' There is no recipe ';

          } else {
                      this.notifyMessage = ' you have ' + response.length + ' recipe/s ';

          }
          this.notify = true;
          setTimeout(() => {
              this.notify = false;
          }, 4000);
      }); */

     // this.recipeSer.getAllRecipe();
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
  }
}
