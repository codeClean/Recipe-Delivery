import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import * as recipeAction from '../store/recipe.action';
import * as fromAppRoot from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
<<<<<<< HEAD
import * as env from '../../../environments/environment';
import * as firebase from 'firebase';
// export default !firebase.apps.length ? firebase.initializeApp(env.environment.firebaseConfig) : firebase.app();
=======
import { authReducer } from 'src/app/login/store/auth.reducer';
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f

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
<<<<<<< HEAD
  imageFile: File;
  urlToUpload: string;
  isLoading = false;
  recipeNew: Recipe;

  constructor(private router: Router,
    private rout: ActivatedRoute,
    private store: Store<fromAppRoot.AppState>) { }
=======

  constructor(private router: Router,
              private rout: ActivatedRoute,
              private store: Store<fromAppRoot.AppState>) { }
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f

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
<<<<<<< HEAD
        this.editMode = isNaN(this.id) ? false : (this.id || this.id == 0) ? true : false;
=======
        this.editMode = isNaN(this.id) ? false : (this.id) ? true : false;
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
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
<<<<<<< HEAD
    this.isLoading = true;
    const username = JSON.parse(localStorage.getItem('userData'));
    const recipeForm = this.recipeFormGroup.value;


    //#region uploading and getting image url

    if (this.imgUploaded) {
      try {
        firebase.initializeApp(env.environment.firebaseConfig);
      }
      catch (err) {
        // ignor the error
      }
      const filename = 'images/' + username + '/' + this.imageFile.name;
      const storageRef = firebase.storage().ref(filename);
      storageRef.put(this.imageFile).then(() => {
        storageRef.getDownloadURL().then((url) => {
          console.log(' got the url ' + url);
          recipeForm.imagePath = url;
          this.recipeNew = new Recipe(username.email,
            recipeForm.name,
            recipeForm.description,
            recipeForm.imagePath,
            recipeForm.ingredients);
          // this.isLoading = false;


          if (this.editMode) {
            this.store.dispatch(new recipeAction.UpdateRecipe({ index: this.id, newRecipe: this.recipeNew }));
            this.store.dispatch( new recipeAction.StoreRecipe());
            this.router.navigate(['/recipe/' + this.id], { relativeTo: this.rout });
          } else {
            this.store.dispatch(new recipeAction.AddRecipe(this.recipeNew));
            this.store.dispatch( new recipeAction.StoreRecipe());
            this.router.navigate(['/recipe'], { relativeTo: this.rout });
          }
        }).catch((error) => {
          console.log(' downloading error ' + error.code);
          this.isLoading = false;
        }
        );
      });
    }
    else {

      this.recipeNew = new Recipe(username.email,
        recipeForm.name,
        recipeForm.description,
        recipeForm.imagePath,
        recipeForm.ingredients);
      if (this.editMode) {
        this.store.dispatch(new recipeAction.UpdateRecipe({ index: this.id, newRecipe: this.recipeNew }));
        this.store.dispatch( new recipeAction.StoreRecipe());
        this.router.navigate(['/recipe/' + this.id], { relativeTo: this.rout });
      } else {
        this.store.dispatch(new recipeAction.AddRecipe(this.recipeNew));
        this.store.dispatch( new recipeAction.StoreRecipe());
        this.router.navigate(['/recipe'], { relativeTo: this.rout });
      }
    }
    //#endregion



=======
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
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
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
<<<<<<< HEAD
      this.imgUploaded = false;
=======
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
      this.url = imgUrl;
    }
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
<<<<<<< HEAD
      this.imageFile = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (myevent) => { // called once readAsDataURL is completed
        this.url = myevent.target.result;
        this.recipeFormGroup.patchValue({
=======

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (myevent) => { // called once readAsDataURL is completed
       this.url = myevent.target.result;
       this.recipeFormGroup.patchValue({
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
          imagePath: '',
        });
      };
      this.imgUploaded = true;
<<<<<<< HEAD

=======
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
    }
  }

}
