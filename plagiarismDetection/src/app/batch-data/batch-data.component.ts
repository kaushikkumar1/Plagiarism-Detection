import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-batch-data',
  templateUrl: './batch-data.component.html',
  styleUrls: ['./batch-data.component.css']
})
export class BatchDataComponent implements OnInit {

  //declere variable here
  findform: FormGroup;
  allBatchName: any;
  batchData: any;
  isloding: boolean;

  constructor(private apiDataService: ApiDataService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {

    //constructor code
    this.findform = new FormGroup({
      batch_name: new FormControl('', { validators: Validators.required })
    })

    this.isloding = true;
    this.apiDataService.getData('/batch/unique').subscribe(d => {
      this.isloding = false;
      this.allBatchName = d['all_batch'];
      console.log(d);
    })


  }

  ngOnInit(): void {

  }

  onFind() {
    console.log(this.findform.value);
    this.isloding = true;
    this.apiDataService.postData('/batch/data', this.findform.value).subscribe(d => {

      this.batchData = d['final_result'];
      console.log(this.batchData);
      this.isloding = false;
    })

  }


}
