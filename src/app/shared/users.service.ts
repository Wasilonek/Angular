import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }

  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  getUsers() {
    this.usersList = this.firebase.list('users');
    return this.usersList.snapshotChanges();
  }

  insertUser(user) {
    if (!this.usersList) {
      this.usersList = this.firebase.list('users');
    }
    this.usersList.push({
      fullName: user.fullName,
      email: user.email,
      password: user.password
    });
  }

  populateForm(user) {
    this.form.setValue(user);
  }

  updateUser(user) {
    this.usersList.update(user.$key,
      {
        fullName: user.fullName,
        email: user.email,
        password: user.password
      });
  }

  deleteUser($key){
    this.usersList.remove($key);
  }
}
