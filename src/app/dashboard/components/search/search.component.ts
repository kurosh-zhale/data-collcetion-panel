import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search_form = new FormControl('');

  constructor() {}

  searched = false;

  ngOnInit(): void {}

  searchEvent() {
    if (!this.searched && this.search_form.value) this.searched = true;
  }
}
