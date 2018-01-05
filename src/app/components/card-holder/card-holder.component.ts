import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';
import TweetModel from '../../models/tweet.model';

@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.css']
})
export class CardHolderComponent implements OnInit {

  private screen_name = 'mpolson64';
  private tweet: string;
  private seeds: string[];
  private chain$: Observable<any>;

  private tweets: TweetModel[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    /*
    this.userService.getSeeds(this.screen_name).subscribe((res: string[]) => {
      this.seeds = res;
      console.log('good');
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.name);
        console.log(err.message);
        console.log(err.status);
        console.log('bad');
      });

    console.log('rip')
    console.log(this.seeds);

    this.chain$ = this.userService.getChain(this.screen_name);
    console.log(this.chain$);
*/

    for (let i = 0; i < 8; i++) {
      const a = new TweetModel(this.screen_name);

      this.tweets.push(a);
    }

  }

}
