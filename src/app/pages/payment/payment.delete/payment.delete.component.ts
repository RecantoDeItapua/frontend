import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { IPayment } from './../../../models/payment';
import { PaymentService } from './../../../services/payment.service';

@Component({
  selector: 'app-payment.delete',
  templateUrl: './payment.delete.component.html',
  styleUrls: ['./payment.delete.component.css']
})
export class PaymentDeleteComponent {
  payment:IPayment = {
    title:'',
    situation:'',
    cash:0,
    person:'',
    personName:'',
    datePayment:'',
    finishPayment:'',
    modePayment:'',
    obs:''
  }

  @ViewChild('content', {static: false})element: ElementRef;
  
  
     constructor(
      private paymentService: PaymentService,
      private router: Router,
      private routes: ActivatedRoute,
      private toast: ToastrService
      ) {}
  
     ngOnInit(): void {
      this.payment.id = this.routes.snapshot.paramMap.get('id');
        this.findById();
        
     }

     findById():void {
      this.paymentService.findById(this.payment.id).subscribe(response => {
        this.payment = response;
        this.payment.modePayment = this.modePayment(this.payment.modePayment)

        this.payment.situation = this.payment.situation == 0 ? 'ABERTO': 'ENCERRADO'
      })
     }


     
     printPaymentPDF():void {
      let pdf = new jsPDF('l','pt','a4');
      
    
      pdf.html(this.element.nativeElement, {
        callback:(pdf) => {
          pdf.save('comprovante_recanto_itapua.pdf')
        }
      })
      
      
     }
  

     modePayment(mode:any): string {
      if(mode == '0') {
        return 'DINHEIRO'
      }
      if(mode == '1') {
        return 'CARTÃO'
      }else {
        return 'PIX'
      }
     }


     delete():void {
      this.paymentService.delete(this.payment.id).subscribe(respose => {
        this.router.navigate(['payments'])
        this.toast.success("Pagamento deletado com sucesso!");
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
      this.router.navigate(['payments'])
    }
  
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
    
    }
}
