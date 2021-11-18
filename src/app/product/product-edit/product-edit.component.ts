import {Component, OnInit} from '@angular/core';
import {Product} from '../../interface/product';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = {};
  id: number;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  ngOnInit() {
    this.getProduct();

  }

  getProduct() {
    this.productService.findById(this.id).subscribe(data => {
      console.log(data);
      this.product = data;
    });
  }

  submit(editProductForm: NgForm) {
    const editedProduct: Product = editProductForm.value;
    editedProduct.category = {
      id: editProductForm.value.category
    };
    this.productService.update(this.id, editedProduct).subscribe(data => {
      console.log(data);
      this.router.navigate(['products']);
    });
  }

}
