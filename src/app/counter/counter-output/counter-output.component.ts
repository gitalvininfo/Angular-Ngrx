import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getCounter } from '../state/counter.selector';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit {
  counter$: Observable<number>;

  private subscription: Subscription = new Subscription();

  // the first counter is in app module
  // the second counter is the structure of the store
  constructor(private store: Store<{ counter: CounterState }>) { }

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter)
  }

}
