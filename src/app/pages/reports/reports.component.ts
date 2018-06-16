import { Component, OnInit } from '@angular/core';
import { OrderrByPipe } from '@pipes/orderBy.pipe';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  // pipes: [ CategoryPipe, OrderrByPipe ]
})
export class ReportsComponent implements OnInit {



  records: Array<any>;
  isDesc = false;
  column = 'CategoryName';
  direction: number;
  constructor() { }

  ngOnInit() {
    this.records = [
      { CategoryID: 1, CategoryName: 'Beverages', DescriptionName: 'Coffees, teas' },
      { CategoryID: 2, CategoryName: 'Condiments', DescriptionName: 'Sweet and savory sauces' },
      { CategoryID: 3, CategoryName: 'Confections', DescriptionName: 'Desserts and candies' },
      { CategoryID: 4, CategoryName: 'Cheeses', DescriptionName: 'Smetana, Quark and Cheddar Cheese' },
      { CategoryID: 5, CategoryName: 'Grains/Cereals', DescriptionName: 'Breads, crackers, pasta, and cereal' },
      { CategoryID: 6, CategoryName: 'Beverages', DescriptionName: 'Beers, and ales' },
      { CategoryID: 7, CategoryName: 'Condiments', DescriptionName: 'Selishes, spreads, and seasonings' },
      { CategoryID: 8, CategoryName: 'Confections', DescriptionName: 'Sweet breads' },
      { CategoryID: 9, CategoryName: 'Cheeses', DescriptionName: 'Cheese Burger' },
      { CategoryID: 10, CategoryName: 'Grains/Cereals', DescriptionName: 'Breads, crackers, pasta, and cereal' }
    ];
    // this.sort(this.column);
  }

  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

}
