import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { PaymentService } from 'src/app/services/payment.service';

import { IPayment } from '../../../models/payment';

@Component({
  selector: 'app-payment.ticket',
  templateUrl: './payment.ticket.component.html',
  styleUrls: ['./payment.ticket.component.css']
})
export class PaymentTicketComponent {

  ELEMENT_DATA: IPayment[] = [];

  @ViewChild('content', {static: false})element: ElementRef;

    constructor(private service: PaymentService, private router: Router) {}


    ngOnInit(): void {
      this.findAll();
      
    }


    findAll(): void {
      this.service.findAll().subscribe(response => {
        this.ELEMENT_DATA = response;
        this.ELEMENT_DATA = response;
      
      })
     }

     situationReturn(situatin:any): string {
      return situatin == 0 ? 'ABERTO': 'ENCERRADO';
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

     printPaymentPDF():void {
      let pdf = new jsPDF('p','pt','a4');
      
    
      pdf.html(this.element.nativeElement, {
        callback:(pdf) => {
          pdf.save('relatorio_recanto_itapua.pdf')
        }
      })
      
      
     }
    
}
