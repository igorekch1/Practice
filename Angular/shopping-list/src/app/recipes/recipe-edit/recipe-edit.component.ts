import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Recipe } from "../recipe-list/recipe.model";
import { RecipesService } from "src/app/services/recipes.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipesService.getRecipeById(+params["id"]);
      this.editMode = !!params["id"];
      console.log(this.editMode);
    });
  }
}
