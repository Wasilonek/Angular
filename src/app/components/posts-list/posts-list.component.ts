import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  constructor(private postsService: PostsService) {}
  postsArray = [];
  showDeleteMessage: boolean;
  searchText: string = '';

  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.postsService.form.controls;

  ngOnInit() {
    this.postsService.getPosts().subscribe(list => {
      this.postsArray = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
    });
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this post?')) {
      this.postsService.deleteUser($key);
      this.showDeleteMessage = true;
      setTimeout(() => {
        this.showDeleteMessage = false;
      }, 4000);
    }
  }

  filterCondition(post) {
    return post.title.toLowerCase().indexOf(this.searchText.toLocaleLowerCase()) != -1;
  }

  onSubmit() {
    this.submitted = true;
    console.log(`SUBMIT`);
    if (this.postsService.form.valid) {
      if (this.postsService.form.get('$key').value == null) {
        this.postsService.insertPost(this.postsService.form.value);
      } else {
        this.postsService.updatePost(this.postsService.form.value);
      }
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
      this.submitted = false;
      this.postsService.form.reset();
    }
  }
}
