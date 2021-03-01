import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { categories } from '../categories';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  category;
  products;

  routeParams;
  categoryTitleFromRoute;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private route: ActivatedRoute,
    ) {
    // First get the product id from the current route
    this.routeParams = this.route.snapshot.paramMap;
    this.categoryTitleFromRoute = String (this.routeParams.get('category'));

    // Find the product that correspond with the id provided in route.
    this.category = categories.find((category) => category.title === this.categoryTitleFromRoute);
    if (this.category) {
      this.products = this.category.products;
    }

    for (let product of this.products) {
      if (product.stars.length == 1) {
        const dividerRating: number = product.rating % 1;
        const intRating: number = product.rating - dividerRating;
        let starCounter: number = 0;
        for (let i = 0; i < intRating; i++) {
          product.stars.push('fas fa-star');
          starCounter++;
        }
        if (dividerRating > 0.7) {
          product.stars.push('fas fa-star');
          starCounter++;
        }
        else if (dividerRating > 0.2) {
          product.stars.push('fas fa-star-half-alt');
          starCounter++;
        }

        for (let i = 0; i < 5 - starCounter; i++) {
          product.stars.push('fas fa-star empty-star');
        }

        product.stars.splice(0, 1);
      }
    }
  }

  share(index) {
    window.location.replace('whatsapp://send/?phone=+77015018998&text=' + this.document.location.href + 'products/' + index);
  }

  remove(index) {
    //this.products = this.products.filter((product) => (product.id !== index));
    categories.find((category) => category.title === this.categoryTitleFromRoute)!.products.splice(index, 1);
    this.products = categories.find((category) => category.title === this.categoryTitleFromRoute)!.products;

  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

  starRating (product) {
    const dividerRating: number = product.rating % 1;
    const intRating: number = product.rating - dividerRating;
    let starCounter: number = 0;
    for (let i = 0; i < intRating; i++) {
      product.stars.push('fas fa-star');
      starCounter++;
    }
    if (dividerRating > 0.7) {
      product.stars.push('fas fa-star');
      starCounter++;
    }
    else if (dividerRating > 0.2) {
      product.stars.push('fas fa-star-half-alt');
      starCounter++;
    }

    for (let i = 0; i < 5 - starCounter; i++) {
      product.stars.push('fas fa-star empty-star');
    }
  }

  onShare(index) {
    window.location.replace('whatsapp://send/?phone=+77015018998&text=' + this.document.location.href + '/' + index);
  }

  onRemove(index) {
    categories.find((category) => category.title === this.categoryTitleFromRoute)!.products.splice(index, 1);
    this.products = categories.find((category) => category.title === this.categoryTitleFromRoute)!.products;
  }

}
