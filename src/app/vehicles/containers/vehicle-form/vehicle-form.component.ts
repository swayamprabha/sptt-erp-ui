import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleFormService } from './vehicle-form.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {

  isFormSaving: boolean = false;
  editMode: boolean = false;
  id: string;
  vehicleForm: FormGroup;
  vehicle: any;
  showModal: boolean = false;
  categories: any;
  showDeleteVehicleModal: boolean = false;
  deletingVehicle: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private titleService: Title,

    private vehicleFormService: VehicleFormService) { }

  ngOnInit() {

    // Build the form
    this.vehicleForm = this.fb.group({
      regNumber: ['', [Validators.required]],
      vehicleCategoryId: ['', [Validators.required]],
      vehicleBrand: ['', [Validators.required]],
      vehicleModel: ['', [Validators.required]],
      vehicleOwner: [''],
      insuranceDuedate: ['', [Validators.required]],
      roadtaxDuedata: ['', [Validators.required]],
      serviceDuedata: ['', [Validators.required]],
      ownershipType: ['', [Validators.required]]
    });

     // Get list of Vehicle Categories
    this.vehicleFormService
      .getCategories()
      .subscribe((data) => this.categories = data);

    // Load data for edit mode
    this.route.data
      .subscribe((data: { vehicle: any }) => {
        if (data.vehicle) {
          this.editMode = true;
          this.titleService.setTitle('SPTT - Edit Vehicle');
          this.vehicle = data.vehicle;
          this.vehicleForm.patchValue(this.vehicle);
          this.vehicleForm.patchValue({
            insuranceDuedate: new Date(this.vehicle.insuranceDuedate).toISOString().slice(0, 10),
            roadtaxDuedata: new Date(this.vehicle.roadtaxDuedata).toISOString().slice(0, 10),
            serviceDuedata: new Date(this.vehicle.serviceDuedata).toISOString().slice(0, 10)
          });
        } else {
          this.editMode = false;
          this.titleService.setTitle('SPTT - New Vehicle');
        }
      });

    // Get id if present in the URL 
    this.route.params
      .subscribe((params: Params) => {
        if (params['id']) {
          this.id = params['id'];
        }
      });
  }

  ngOnChanges() {
    this.vehicleForm.reset(this.vehicle);
    this.vehicleForm.patchValue({
      insuranceDuedate: new Date(this.vehicle.insuranceDuedate).toISOString().slice(0, 10),
      roadtaxDuedata: new Date(this.vehicle.roadtaxDuedata).toISOString().slice(0, 10),
      serviceDuedata: new Date(this.vehicle.serviceDuedata).toISOString().slice(0, 10)
    });
  }

  revert() { this.ngOnChanges(); }

  newVehicleForm(){
     this.vehicleForm.reset();
     this.showModal = false;
  }
  
  deleteVehicle(){
    this.deletingVehicle = true;
    this.vehicleFormService
    .deleteVehicle(this.id)
     .subscribe((data) => {
        this.deletingVehicle = false;
        this.showDeleteVehicleModal = false;
        this.router.navigate(['/vehicles']);
    });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.isFormSaving = true;
    if (this.editMode) {
      this.vehicleFormService
        .updateVehicle(this.id, value)
        .subscribe((data) => {
          this.isFormSaving = false;
          this.showModal = true;
        });
    } else {
      this.vehicleFormService
        .saveNewVehicle(value)
        .subscribe((data: any) => {
          console.log(data);
          this.id = data.id;
          this.isFormSaving = false;
          this.showModal = true;
          this.vehicle = data;
          this.ngOnChanges;
          //this.router.navigate(['/day-summary/'+ data.id],{replaceUrl: true})
        });
    }
  }
}
