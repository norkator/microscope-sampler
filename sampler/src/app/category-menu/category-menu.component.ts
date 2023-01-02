import {Component, OnInit} from '@angular/core';
import {CategoryInterfaces} from "../interfaces";
import {CategoryService} from "./category.service";
import {NavigationExtras, Router} from "@angular/router";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {

  public categories: CategoryInterfaces[] = [];
  public selectedCategoryId: number = 0;
  public categoryAddModalOpen: boolean = false;

  // Forms
  public categoryFormGroup!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.categoryFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.getCategories();
  }

  private getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: CategoryInterfaces[]) => {
        this.categories = data;
      },
      error: (error: any) => console.error(error)
    });
  }

  public openCategory(id: number): void {
    this.selectedCategoryId = id;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        category_id: id,
      }
    };
    this.router.navigate(['sample-group'], navigationExtras).then(() => null);
  }

  public addCategory(): void {

  }

}
