import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string = '';
  public tituloSubs$:Subscription;

  constructor(private router: Router, private route: ActivatedRoute) { 

    // route.snapshot.children[0].data; solo muesta la data de la primear pagina que ese carga

    this.tituloSubs$ = this.getArgumentosRuta()
      .subscribe( ({titulo}) => {// data.titulo
      this.titulo = titulo;
      document.title = `Adminpro .::.::. ${titulo}`;
      });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }


  getArgumentosRuta() {
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ? true: false),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( event => event.snapshot.data)
    );
  }

}
