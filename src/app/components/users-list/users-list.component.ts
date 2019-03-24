import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  constructor(private usersService: UsersService) {}
  usersArray = [];
  showDeleteMessage: boolean;
  searchText: string = '';

  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.usersService.form.controls;

  ngOnInit() {
    this.usersService.getUsers().subscribe(list => {
      this.usersArray = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
    });
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this user?')) {
      this.usersService.deleteUser($key);
      this.showDeleteMessage = true;
      setTimeout(() => {
        this.showDeleteMessage = false;
      }, 4000);
    }
  }

  filterCondition(user) {
    return user.fullName.toLowerCase().indexOf(this.searchText.toLocaleLowerCase()) != -1;
  }

  onSubmit() {
    this.submitted = true;
    if (this.usersService.form.valid) {
      if (this.usersService.form.get('$key').value == null) this.usersService.insertUser(this.usersService.form.value);
      else this.usersService.updateUser(this.usersService.form.value);
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
      this.submitted = false;
      this.usersService.form.reset();
    }
  }
}
