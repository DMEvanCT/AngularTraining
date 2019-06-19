import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  closeNav = new EventEmitter<void>()

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.closeNav.emit()
  }

}
