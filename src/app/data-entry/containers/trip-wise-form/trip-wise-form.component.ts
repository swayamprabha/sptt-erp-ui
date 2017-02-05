import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripWiseFormService } from './trip-wise-form.service';

@Component({
  selector: 'app-trip-wise-form',
  templateUrl: './trip-wise-form.component.html',
  styleUrls: ['./trip-wise-form.component.scss']
})
export class TripWiseFormComponent implements OnInit {

  isFormSaving: boolean = false;
  editMode: boolean = false;
  tripId: string;
  tripSummaryForm: FormGroup;
  tripSummary: any;
  showModal: boolean = false;
  alldaySummary: any;
  operators: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tripWiseFormService: TripWiseFormService
  ) { }

  ngOnInit() {

    // Build the form
    this.tripSummaryForm = this.fb.group({
      tripOrigin: [''],
      tripDestination: [''],
      customerName: [''],
      rideKMS: ['',[Validators.required]],
      billAmount: ['',[Validators.required]],
      cashCollected: [''],
      onlinePayment: [''],
      olaMoney: [''],
      paytm: [''],
      self: [''],
      balance: [''],
      airportToll: [''],
      localToll: [''],
      incentives: [''],
      remarks: [''],
      rideEarnings: ['',[Validators.required]]
    });

    // Get list of Operators
    this.tripWiseFormService
      .getOperators()
      .subscribe((data) => this.operators = data);

    // Load alldaySummary and tripSummary from resolve
    this.route.data
      .subscribe((data: { alldaySummary: any, tripSummary: any }) => {
        this.alldaySummary = data.alldaySummary;
        if (data.tripSummary) {
          this.editMode = true;
          this.tripSummary = data.tripSummary;
          this.tripSummaryForm.patchValue(this.tripSummary);
        } else {
          this.editMode = false;
        }
      });
  }

}
