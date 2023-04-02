import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  // shows the number of pages (start's with 0)
  @Input('pages') pages: number = 99;

  // shows the current page index (start's with 0)
  currentPage: number = 0;

  constructor() {}

  ngOnInit(): void {}

  first_page() {
    this.currentPage = 0;
  }

  last_page() {
    this.currentPage = this.pages;
  }

  next_page() {
    if (this.currentPage !== this.pages) this.currentPage++;
  }

  previous_page() {
    if (this.currentPage !== 0) this.currentPage--;
    console.log(this.currentPage);
  }

  set_page(page: number) {
    this.currentPage = page;
    console.log(this.currentPage);
  }
}
