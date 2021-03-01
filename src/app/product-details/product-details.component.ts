import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//import {products} from '../products';
import { categories } from '../categories';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products;
  product;
  indexOfCurrentImage: number = 0;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // First get the product id from the current route
    const routeParams = this.route.snapshot.paramMap;
    const categoryTitleFromRoute = String (routeParams.get('categoryTitle'));
    const productIdFromRoute = Number (routeParams.get('productId'));

    const category = categories.find((category) => category.title === categoryTitleFromRoute);
    if (category) {
      this.products = category.products;
    }

    console.log(this.products.title);

    // Find the product that correspond with the id provided in route.
    this.product = this.products.find(product => product.id === productIdFromRoute);

    //Star rating
    if (this.product.stars.length == 1) {
      const dividerRating: number = this.product.rating % 1;
      const intRating: number = this.product.rating - dividerRating;
      let starCounter: number = 0;
      for (let i = 0; i < intRating; i++) {
        this.product.stars.push('fas fa-star');
        starCounter++;
      }
      if (dividerRating > 0.7) {
        this.product.stars.push('fas fa-star');
        starCounter++;
      }
      else if (dividerRating > 0.2) {
        this.product.stars.push('fas fa-star-half-alt');
        starCounter++;
      }

      for (let i = 0; i < 5 - starCounter; i++) {
        this.product.stars.push('fas fa-star empty-star');
      }

      this.product.stars.splice(0,1);
    }


  }

  changeCurrentIndex (index) {
    this.indexOfCurrentImage = index;
  }

  /*starRating (rating) {
    const dividerRating: number = rating % 1;
    const intRating: number = rating - dividerRating;
    let starCounter: number = 0;
    for (let i = 0; i < intRating; i++) {
      this.stars.push('fas fa-star');
      starCounter++;
    }
    if (dividerRating > 0.7) {
      this.stars.push('fas fa-star');
      starCounter++;
    }
    else if (dividerRating > 0.2) {
      this.stars.push('fas fa-star-half-alt');
      starCounter++;
    }

    for (let i = 0; i < 5 - starCounter; i++) {
      this.stars.push('fas fa-star empty-star');
    }
  }*/

}
