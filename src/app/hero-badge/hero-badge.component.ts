import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {Hero} from "../hero";

@Component({
  selector: 'hero-badge',
  templateUrl: 'hero-badge.component.html',
  styleUrls: ['hero-badge.component.scss'],
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
