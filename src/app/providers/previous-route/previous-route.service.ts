import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class PreviousRouteService{
    
    public previousUrl: string;
    public currentUrl: string;
    
    constructor(private router: Router) {

        this.fetchPreviousUrl();
        this.getPreviousUrl();

        // this.router.events
        //             .pipe(filter((event: any) => event instanceof NavigationStart), pairwise())
        //             .subscribe((events: NavigationStart[]) => {
        //                 this.previousUrl = events[0].urlAfterRedirects;
        //                 this.currentUrl = events[1].urlAfterRedirects;
        //             });

    }
    
    public getPreviousUrl() {
        return this.previousUrl;
    }

    async fetchPreviousUrl() {

          this.currentUrl = this.router.url;
          await this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {        
              this.previousUrl = this.currentUrl;
              this.currentUrl = event.url;
            };
          });

        // await this.router.events
        // .pipe(filter(event => event instanceof NavigationEnd))
        // .subscribe((event: NavigationEnd) => {
        //     this.previousUrl = event.url;
        // });
    }

};
