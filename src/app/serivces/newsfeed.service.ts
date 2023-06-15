import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import API_KEY from '../../config';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {
  sources: any = [];
  articles: any = [];
  techFeed: any = [];
  api_key = API_KEY;
  constructor(private http: HttpClient) { }


  initSources() {
    if (this.sources.length === 0) {
      this.sources = this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.api_key);
      return this.sources
    } else {
      return this.sources;
    }
  }


  initArticles() {
    if (this.articles.length === 0) {
      this.articles = this.http.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + this.api_key);
      return this.articles;
    } else {
      return this.articles;
    }
  }

  getArticlesByID(source: String) {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.api_key);
  }

  getTechFeed() {
    if (this.techFeed.length === 0) {
      this.techFeed = this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.api_key);
      return this.techFeed;
    } else {
      console.log('techFeed');
      return this.techFeed;
    }
  }

}