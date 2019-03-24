import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { UsersComponent } from './components/users/users.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  { path: 'home', component: PostsListComponent },
  { path: 'usersList', component: UsersListComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'contact', component: ContactFormComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PostsListComponent, UsersListComponent, LoginFormComponent, ContactFormComponent];