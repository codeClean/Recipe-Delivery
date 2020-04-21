import { Ingredient } from '../shared/shared.model';
export class Recipe {
    public username: string;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
<<<<<<< HEAD
     constructor(username: string,
                 name: string,
                 description: string,
                 imagePath: string,
                 ingredients: Ingredient[]) {
        this.username = username;
=======
    constructor(username: string , name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
>>>>>>> a48a755a9fa11c60553f3904e8c6861239a5fe2f
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}
