import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval,  Subscription } from 'rxjs';
import { retry, map, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public subscription: Subscription;

  constructor() {

    // this.retornaObservable()
    //   .pipe(
    //     retry(2)
    //   )
    //   .subscribe(
    //   msg => console.log('Subs: ', msg),
    //   err => console.error(err),
    //   () => console.log('Obsevable terminado')
    // );

    this.subscription = this.retornaIntervalo()
    .subscribe(
      valor => console.log(valor)
    );
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(100)
      .pipe(
        // take(10), // Solo muestra 5 valores 
        map( valor => valor + 1),
        filter( valor => ( valor % 2 === 0) ? true : false),
        //take(10), // Muestra 10 valores
      );

    return intervalo$
  }

  retornaObservable(): Observable<number> {
      return new Observable(observer => {
        let i = 0;
        const intervalo = setInterval(() => {
          i++;
          observer.next(i);
  
          if (i === 4) {
            clearInterval(intervalo);
            observer.complete();
          }
  
          if (i === 3) {
            clearInterval(intervalo);
            observer.error('Upss ya chiflo');
          }
        }, 1000);
  
      });
  }
}
