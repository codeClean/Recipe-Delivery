import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() getRecipe: Recipe;
  @Input() inputIndex: number;

   constructor() { }

  ngOnInit(): void {
    //this.getRecipe =  this.recipeSer.getRecipe(); 
  }
  detailFunc() {
    //this.recipeSer.onRecipeEmit(this.getRecipe);
  }
  

}
