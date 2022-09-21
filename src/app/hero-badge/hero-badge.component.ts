import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {Hero} from "../hero";

@Component({
  selector: 'hero-badge',
  templateUrl: 'hero-badge.component.html',
  styles: [`
    :host {
        display: inline-block;
    }
    :host a {
      background-color: #3f525c;
      border-radius: 2px;
      padding: 1rem;
      font-size: 1.2rem;
      text-decoration: none;
      display: inline-block;
      color: #fff;
      text-align: center;
      width: 100%;
      min-width: 70px;
      margin: .5rem auto;
      box-sizing: border-box;

      /* flexbox */
      order: 0;
      flex: 0 1 auto;
      align-self: auto;
    }
  `]
})
export class HeroBadgeComponent implements OnInit, OnDestroy{

  @Input() hero?:Hero;
  @Output() select:EventEmitter<Hero> = new EventEmitter();

  ngOnDestroy(): void {
    this.select.complete();
    console.log('je suis mort... aahh');
  }

  ngOnInit(): void {
  }

}
