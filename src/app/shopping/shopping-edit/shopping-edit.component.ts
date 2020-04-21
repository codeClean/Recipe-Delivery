import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/shared.model';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer';
import * as shoppingListAction from '../store/shopping-list.action';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  /* @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef; */

  @ViewChild('f') formControl: FormControl;

  subscribIngredient: Subscription;
  ingredient: Ingredient;
  isEditing = false;
  ingredientIndex: number;

  // @Output() ingredientAdded = new EventEmitter<Ingredient>(); //we can get is from the state
  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.subscribIngredient = this.store.select('shoppingList').subscribe(appState => {
      if (appState.index > -1) {
        this.ingredientIndex = appState.index;
        this.isEditing = true;
        this.ingredient = appState.ingredient;
        // this.ingredient = this.shoppingService.getIngredient()[index];
        setTimeout(() => {
          this.formControl.setValue({ name: this.ingredient.name, amount: this.ingredient.amount });
        });
        this.isEditing = true;

      } else { this.isEditing = false; }
    });

  }
  onSubmit(form: NgForm) {
    /*  const ingName = this.nameInputRef.nativeElement.value;
     const ingAmount = this.amountInputRef.nativeElement.value;
  */
    const ingName = form.value.name;
    const ingAmount = form.value.amount;

    const newIngredientAdded = new Ingredient(ingName, ingAmount);
    if (this.isEditing) {
      // the index will be featched from the state in the reducer
      this.store.dispatch(new shoppingListAction.UpdateIngredient(newIngredientAdded));
      // this.shoppingService.onIngredientUpdate(this.ingredientIndex, newIngredientAdded);
    } else {

      this.store.dispatch(new shoppingListAction.AddIngredient(newIngredientAdded));
      // this.shoppingService.onIngrediantAdd(newIngredientAdded);
      // this.ingredientAdded.emit(newIngredientAdded);
    }
    this.isEditing = false;
    form.reset();
  }
  onDelete() {
    this.store.dispatch(new shoppingListAction.DeleteIngredient());
    // this.shoppingService.onDelete(this.ingredientIndex);
    this.formControl.reset();
    this.isEditing = false;
  }

  onClear() {
    this.formControl.reset();
    this.isEditing = false;
    this.store.dispatch(new shoppingListAction.StopEdit());
  }


}
