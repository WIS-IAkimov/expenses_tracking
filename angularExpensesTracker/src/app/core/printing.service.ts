import { Injectable } from '@angular/core';

@Injectable()
export class PrintingService {

  public print(printEl: Element) {
   let  popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="/style.css" /> <style>.notPrint {display: none}</style></head><body onload="window.print()">' + printEl.innerHTML + '</html>');
    popupWinindow.document.close();
  }
}
