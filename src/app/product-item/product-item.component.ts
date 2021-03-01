import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product;
  @Input() category;
  @Input() positionInArray;
  @Output() share = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  shareProduct(id: number) {
    this.share.emit(id);
  }

  removeProduct() {
    this.remove.emit(this.positionInArray);
  }

  changeLikes() {
    this.product.isLiked ? this.product.likes++ : this.product.likes--;
  }

}
