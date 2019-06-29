import {Component, EventEmitter, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  closeNav = new EventEmitter<void>()
  isAuthed:  boolean;
  authSubsription: Subscription;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubsription = this.authService.authChange.subscribe(authStatus => {
      this.isAuthed = authStatus;
    })
  }

  onClose() {
    this.closeNav.emit()
  }

  ngOnDestroy() {
    this.authSubsription.unsubscribe()
  }

  onLogout() {
    this.onClose()
    this.authService.logout()

  }

}
