import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.usersService.form.controls;

  ngOnInit() {
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
