import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NewsfeedService } from 'src/app/serivces/newsfeed.service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements AfterViewInit {
  title = 'NewsProject';
  orgSources: any = [];
  sources: any = [];
  articles: any = [];
  selectedSource: string = 'Top 10 Articles';
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  searchTerm: string = '';

  ngOnInit(): void {
    this.newsApi.initArticles().subscribe((res: any) => {
      this.articles = res.articles;
    })
    this.newsApi.initSources().subscribe((res: any) => {
      this.orgSources = res.sources;
      this.sources = res.sources;
    })
  }
  constructor(private observer: BreakpointObserver, private cd: ChangeDetectorRef, private newsApi: NewsfeedService) {

  }

  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:800px)'])
      .subscribe((res) => {
        if (res?.matches) {
          this.sideNav.mode = "over";
          this.sideNav.close();
        } else {
          this.sideNav.mode = 'side';
          this.sideNav.open();
        }
      })
    this.cd.detectChanges();
  }

  getSource(source: any) {
    this.newsApi.getArticlesByID(source.id)
      .subscribe((res: any) => {
        this.selectedSource = source.name
        this.articles = res.articles;
      })
    this.observer.observe(['(max-width:800px)'])
      .subscribe((res) => {
        if (res?.matches) {
          this.sideNav.mode = "over";
          this.sideNav.close();
        }
      })
  }

  updateSearch(searchTerm: string) {
    this.searchTerm = searchTerm;

    if (!this.searchTerm) {
      this.sources = this.orgSources;
    }

    this.sources = this.sources.filter((src: { name: string; }) =>
      src.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}
