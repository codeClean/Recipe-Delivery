import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import * as recipeAction from '../store/recipe.action';
import * as fromAppRoot from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { authReducer } from 'src/app/login/store/auth.reducer';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  imgUploaded = false;
  recipeFormGroup: FormGroup;
  recipeVal: Recipe;
  ingredientsFrom: FormArray;
  ingFormGroup: FormGroup;
  url: any;

  constructor(private router: Router,
              private rout: ActivatedRoute,
              private store: Store<fromAppRoot.AppState>) { }

  ngOnInit(): void {

    this.rout.params.pipe(map(params => {
      return +params.id;
    }),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipeState');
      }),
      map(responseData => {
        return responseData.recipes.find((recipe, index) => {
          return index === this.id;
        });
      })).subscribe((recipe: Recipe) => {
        this.editMode = isNaN(this.id) ? false : (this.id) ? true : false;
        this.recipeVal = recipe;
        this.ingredientsFrom = new FormArray([]);
        if (this.editMode && this.recipeVal && this.recipeVal.ingredients != null) {
          for (const ing of this.recipeVal.ingredients) {
            this.ingredientsFrom.push(new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
            );
          }
        }

        this.initForm();
      });
  }

  addIngredient() {
    (this.recipeFormGroup.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl()
      })
    );

    // this.initForm();
  }
  private initForm() {
    let nameForm = '';
    let imagePathForm = '';
    let descriptionForm = '';
    if (this.editMode) {
      nameForm = this.recipeVal.name;
      imagePathForm = this.recipeVal.imagePath;
      descriptionForm = this.recipeVal.description;
      this.url = this.recipeVal.imagePath;
      // ingredients =  this.ingredientsFrom;
    }

    this.recipeFormGroup = new FormGroup({
      name: new FormControl(nameForm, Validators.required),
      imagePath: new FormControl(imagePathForm),
      description: new FormControl(descriptionForm, Validators.required),
      ingredients: this.ingredientsFrom
    });
  }
  getControl() {
    return (this.recipeFormGroup.get('ingredients') as FormArray).controls;
  }

  addRecipe() {
    const user = JSON.parse(localStorage.getItem('userData'));
    const recipeForm = this.recipeFormGroup.value;
    const recipeNew: Recipe = new Recipe(user.email,
      recipeForm.name,
      recipeForm.description,
      recipeForm.imagePath,
      recipeForm.ingredients);

    if (this.editMode) {
      this.store.dispatch(new recipeAction.UpdateRecipe({ index: this.id, newRecipe: recipeNew}));
      // this.recipeService.uppdateRecipe(this.id, this.recipeFormGroup.value);
    } else {
      this.store.dispatch(new recipeAction.AddRecipe(recipeNew));
      // this.recipeService.addRecipe(this.recipeFormGroup.value);
    }
    this.router.navigate(['../'], { relativeTo: this.rout });
    // console.log('recipe ' + recipeNew.name);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.rout });
  }

  onDeleteIngredient(index: number) {

    (this.recipeFormGroup.get('ingredients') as FormArray).removeAt(index);
  }

  onUploadImg(imgUrl) {
    console.log(' img uploading ' + imgUrl);
    if (imgUrl !== '') {
      this.url = imgUrl;
    }
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (myevent) => { // called once readAsDataURL is completed
       this.url = myevent.target.result;
       this.recipeFormGroup.patchValue({
          imagePath: '',
        });
      };
      this.imgUploaded = true;
    }
  }

}
