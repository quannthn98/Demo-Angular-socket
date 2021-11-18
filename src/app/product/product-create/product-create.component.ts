import {Component, OnInit} from '@angular/core';
import {Product} from '../../interface/product';
import {NgForm} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {};

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
  }

  submit(createProductForm: NgForm) {
    this.product = createProductForm.value;
    this.product.category = {
      id: createProductForm.value.category
    };
    this.productService.addProduct(this.product).subscribe(data => {
      console.log(data);
      createProductForm.resetForm();
      this.router.navigate(['products']);

    }, error => {
      alert(error);
    });
  }

}
