import {Component, OnInit} from '@angular/core';
import {CategoryInterfaces} from "../interfaces";
import {CategoryService} from "./category.service";

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {

  public categories: CategoryInterfaces[] = [];

  constructor(
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
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

}
