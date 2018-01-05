class TweetModel {
  screen_name: string;
  text: string;
  time: string;

  constructor(screen_name) {
    this.screen_name = screen_name;

    this.text = 'Rice is good';

    const minutes: number = Math.floor(Math.random() * 1440);

    if (minutes > 60) {
      this.time = Math.floor(minutes / 60) + 'h';
    } else {
      this.time = minutes + 'm';
    }
  }
}

export default TweetModel;
