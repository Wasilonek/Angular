import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }

  form = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  getPosts() {
    this.postsList = this.firebase.list('posts');
    return this.postsList.snapshotChanges();
  }

  insertPost(post) {
    if (!this.postsList) {
      this.postsList = this.firebase.list('posts');
    }
    this.postsList.push({
      title: post.title,
      content: post.content,
    });
  }

  populateForm(post) {
    this.form.setValue(post);
  }

  updatePost(post) {
    this.postsList.update(post.$key,
      {
        title: post.title,
        content: post.content,
      });
  }

  deleteUser($key){
    this.postsList.remove($key);
  }
}
