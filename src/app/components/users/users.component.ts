import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../shared/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.usersService.form.controls;

  ngOnInit() {
    // this.usersService.insertUser({
    //   fullName: 'Kamil Wasilonek',
    //   email: 'wasilonek@interia.eu',
    //   password: '123456'
    // });
  }

  onSubmit() {
    this.submitted = true;
    if (this.usersService.form.valid) {
      if (this.usersService.form.get('$key').value == null)
        this.usersService.insertUser(this.usersService.form.value);
      else
        this.usersService.updateUser(this.usersService.form.value);
      this.showSuccessMessage = true;
      setTimeout(() => { this.showSuccessMessage = false }, 3000);
      this.submitted = false;
      this.usersService.form.reset();
    }

  }
}


