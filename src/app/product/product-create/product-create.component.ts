import {Component, OnInit} from '@angular/core';
import {Product} from '../../interface/product';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  baseUrl = 'http://localhost:8080/';
  product: Product = {};

  formCreate = new FormGroup({
    name: new FormControl(),
    quantity: new FormControl(),
    manufacturer: new FormControl(),
    category: new FormControl(),
    image: new FormControl(),
  });

  constructor(private productService: ProductService,
              private router: Router,
              private http: HttpClient,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formCreate = this.formBuilder.group({
      name: new FormControl(),
      quantity: new FormControl(),
      manufacturer: new FormControl(),
      category: new FormControl(),
      image: new FormControl(),
    });
  }

  // submit(createProductForm: FormGroup) {
  //   this.product = createProductForm.value;
  //   this.product.category = {
  //     id: createProductForm.value.category
  //   };
  //   this.productService.addProduct(this.product).subscribe(data => {
  //     console.log(data);
  //     createProductForm.resetForm();
  //     this.router.navigate(['products']);
  //
  //   }, error => {
  //     alert(error);
  //   });
  // }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formCreate.get('image').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('image', this.formCreate.get('image').value);
    formData.append('name', this.formCreate.get('name').value);
    this.http.post(`${this.baseUrl}products`, formData).subscribe(data => {
      console.log(data);
    });
  }
}
