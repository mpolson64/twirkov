import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {UserService} from '../../services/user.service';
import TweetModel from '../../models/tweet.model';

@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.css']
})

export class CardHolderComponent implements OnInit {

  private numTweets = 16;

  private screen_name: string;
  private seeds: string[];
  private chain: Map<string, Map<string, number>> ;

  public tweets: TweetModel[] = [];

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.screen_name = params.screen_name || 'davidleebron';

      this.userService.getChain(this.screen_name).subscribe((res0: Array<[string, Array<[string, number]>]>) => {
        this.chain = this.objectToChain(res0);

        this.userService.getSeeds(this.screen_name).subscribe((res1: string[]) => {
          this.seeds = res1;

          for (let i = 0; i < this.numTweets; i++) {
            const a = new TweetModel(this.screen_name, this.generateText());
            this.tweets.push(a);
          }
        });
      });
    });
  }

  private objectToChain(obj: Array<[string, Array<[string, number]>]>): Map<string, Map<string, number>> {
    const chain: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();

    obj.forEach((element) => {
      chain.set(element[0], new Map(element[1]));
    });

    return chain;
  }

  private feedforward(probabilityMap: Map<string, number>): string {
    const roll: number  = Math.random();
    let s = 0;

    const items: number[] = Array.from(probabilityMap.values());
    const keys: string[] = Array.from(probabilityMap.keys());

    for (let i = 0; i < probabilityMap.size; i += 1) {
      s += items[i];

      if (s >= roll) {
        return keys[i];
      }
    }

    return '';
  }

  private generateText(): string {
    while (true) {
      const keys: string[] = [];

      let seed: string = this.seeds[Math.floor(Math.random() * this.seeds.length)];

      while (!seed.includes('||')) {
        keys.push(seed);

        const probabilityMap = this.chain.get(seed);

        if (typeof probabilityMap !== 'undefined') {
          const long: string = seed + '|' + this.feedforward(this.chain.get(seed));
          seed = long.substr(long.indexOf('|') + 1);
        } else {
          break;
        }
      }

      const candidateWords = keys.length - 1;

      if (candidateWords > 5) {
        return this.joinKeys(keys);
      }
    }

  }

  private joinKeys(keys): string {
    const words = keys[0].split('|');

    const following = keys.slice(1);

    following.forEach((key) => {
      const ind: string[] = key.split('|');
      words.push(ind[ind.length - 1]);
    });

    return words.join(' ');
  }

}
