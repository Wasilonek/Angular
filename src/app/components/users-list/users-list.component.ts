import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private usersService: UsersService) { }
  usersArray = [];
  showDeleteMessage: boolean;
  searchText:string = "";

  ngOnInit() {
    this.usersService.getUsers().subscribe(
      list => {
        this.usersArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          }
        }
        )
      });
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this user?')) {
      this.usersService.deleteUser($key);
      this.showDeleteMessage = true;
      setTimeout(() => { this.showDeleteMessage = false }, 4000);
    }
  }

  filterCondition(user){
    return user.fullName.toLowerCase().indexOf(this.searchText.toLocaleLowerCase()) != -1;
  }

}
