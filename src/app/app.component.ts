import { Component, OnInit } from '@angular/core';
import { PropertyService } from './services/property.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  propertyForm!: FormGroup;
  properties: any = [];

  constructor(private propertyService: PropertyService) {}
  ngOnInit(): void {
    this.propertyForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, Validators.required),
      size: new FormControl(null, [Validators.required, Validators.min(0)]),
    });
    this.getProperty();
  }

  getProperty() {
    this.propertyService.getProperty().subscribe((val) => {
      this.properties = val.records;
    });
  }

  onForm() {
    this.propertyService
      .addProperty(this.propertyForm.value)
      .subscribe((_res) => {
        this.propertyForm.reset();
        this.getProperty();
      });
  }
  deleteProperty(property: any) {
    this.propertyService.deleteProperty(property.id).subscribe((_res) => {
      this.getProperty();
    });
  }
}
