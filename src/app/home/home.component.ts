import { Component, AfterViewInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    setTimeout(() => {
      AOS.init();
      AOS.refresh();
    }, 100);  // Delay ensures AOS detects new elements
  }
}
