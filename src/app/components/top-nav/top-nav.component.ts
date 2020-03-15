import { Component, OnInit, Inject } from '@angular/core';
import { AuthService, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})

export class TopNavComponent implements OnInit {

  public user: SocialUser;
  public loggedIn: boolean;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
      const rdbUser = new User();
      rdbUser.email = user.email;
      rdbUser.name = user.name;
      rdbUser.photoUrl = user.photoUrl;
      rdbUser.provider = user.provider;
      rdbUser.socialId = user.id;
      this.userService.saveUser(rdbUser).subscribe(response => {
      });
    });
  }

}
