import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { PaymentService } from 'src/app/services/payment.service';

import { IPayment } from '../../../models/payment';

@Component({
  selector: 'app-payment.report',
  templateUrl: './payment.report.component.html',
  styleUrls: ['./payment.report.component.css']
})
export class PaymentReportComponent implements OnInit {
  p: number = 1;
  collection: any[] =[]
  
  page:number = 0
  ELEMENT_DATA: IPayment[] = [];

  @ViewChild('content', {static: false})element: ElementRef;

    constructor(private service: PaymentService, private router: Router) {}


    ngOnInit(): void {
      this.findAll();
      
    }


    findAll(): void {
      this.ELEMENT_DATA = JSON.parse(localStorage.getItem('payment'))
      
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
