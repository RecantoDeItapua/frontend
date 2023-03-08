import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { IAdress } from './../../../models/adress';
import { AdressService } from './../../../services/adress.service';

@Component({
  selector: 'app-adress.delete',
  templateUrl: './adress.delete.component.html',
  styleUrls: ['./adress.delete.component.css']
})
export class AdressDeleteComponent implements OnInit{
  adress: IAdress = {
    id:'',
    adress:'',
    person:'',
    personName:'',
  
  }
  
    constructor( 
      private service: AdressService,
      private toast: ToastrService,
      private router: Router,
      private routes: ActivatedRoute,
      ) {}
  
   
      ngOnInit(): void {
        this.adress.id = this.routes.snapshot.paramMap.get('id');
        this.findById();
       
      }

      findById():void {
        this.service.findById(this.adress.id).subscribe(response => {
          this.adress = response;
        })
  
      }

  
    delete():void {
      this.service.delete(this.adress.id).subscribe(respose => {
        this.router.navigate(['adress'])
        this.toast.success("Endereço  deletado com sucesso!");
      }, ex => {
        if(ex.error.errors) {
          ex.error.errors.map(x => this.toast.error(x.message))
        }
        else {
          this.toast.error(ex.error.message)
        }
      })
    }
    
  
      goBack():void {
        this.router.navigate(['adress'])
      }

    }
