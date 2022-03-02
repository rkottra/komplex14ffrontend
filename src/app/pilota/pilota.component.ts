import { Component, OnInit } from '@angular/core';
import { PilotaModel } from '../models/pilota.model';
import { PilotaService } from '../pilota.service';

interface Nemzetiseg {
  name: string,
  code: string
}


@Component({
  selector: 'app-pilota',
  templateUrl: './pilota.component.html',
  styleUrls: ['./pilota.component.css']
})
export class PilotaComponent implements OnInit {

  public pilotak: PilotaModel[] = []; 

  public ujpilota: PilotaModel = new PilotaModel();
  display: boolean = false;
  
  public nemzetisegek: Nemzetiseg[];


  constructor(private szerviz:PilotaService) { 

      this.nemzetisegek = [
          {name: 'angol', code: 'angol'},
          {name: 'finn', code: 'finn'},
          {name: 'német', code: 'német'},
      ];

      this.szerviz.getPilotak().subscribe( adatok => {
       
        this.pilotak = adatok;

        //this.pilotak[7].csapat.nemzet = "asd";
      })
  }

  ngOnInit(): void {
  }

  showDialog() {
    this.display = !this.display;
  }

  save() {
    alert(this.ujpilota);
    this.display = false;
  }

  cancel() {
    this.display = false;
  }
  
  torles(pilotaId:number) {
    this.szerviz.deletePilota(pilotaId).subscribe();
  }

}
