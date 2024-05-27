import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelativeIdService {
  private idSource = new BehaviorSubject<number | null>(null);
  currentId = this.idSource.asObservable();
  
  changeId(id: number) {
    this.idSource.next(id);
  }
}