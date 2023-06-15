import { Component, OnInit } from '@angular/core';
import { NewsfeedService } from 'src/app/serivces/newsfeed.service';
@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {

  techFeed: any = [];


  ngOnInit(): void {

    this.newsApi.getTechFeed().subscribe((res: any) => {
      this.techFeed = res.articles.slice(0, 6);
      console.log(this.techFeed);
    })
  }
  constructor(private newsApi: NewsfeedService) {

  }

  ngAfterViewInit(): void {
  }
}
