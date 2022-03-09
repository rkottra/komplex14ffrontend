import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { CsapatModel } from '../models/csapat.model';
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

  public fejleccime:string  = "Új adat hozzáadása";
  
  constructor(private szerviz:PilotaService, private confirmationService: ConfirmationService) { 

      this.nemzetisegek = [
          {name: 'angol', code: 'angol'},
          {name: 'finn', code: 'finn'},
          {name: 'német', code: 'német'},
      ];

      this.szerviz.getPilotak().subscribe( adatok => {
       
        this.pilotak = adatok;

        
      })
  }

  ngOnInit(): void {
  }

  showDialog() {
    this.fejleccime = "Új adat hozzáadása";
    this.display = !this.display;
  }

  save(modositas:boolean = true) {
    if (modositas === false) {
      this.szerviz.insertPilota(this.ujpilota).subscribe(
        () => {
          this.szerviz.getPilotak().subscribe(adatok => {
            this.pilotak = adatok;
          })
          /*
          this.pilotak.push(this.ujpilota);
          */
          this.ujpilota = new PilotaModel();
          
        }
      );
    } else {
      this.szerviz.updatePilota(this.ujpilota).subscribe(
        () => {
          this.szerviz.getPilotak().subscribe(adatok => {
            this.pilotak = adatok;
          })
          /*
          this.pilotak.push(this.ujpilota);
          */
          this.ujpilota = new PilotaModel();
          
        }
      );
    }
    this.display = false;
  }

  cancel() {
    this.display = false;
  }
  
  torles(pilotaId:number) {
    this.confirmationService.confirm({
      message: 'Biztos, hogy törölni szeretnéd?',
      accept: () => {
        this.szerviz.deletePilota(pilotaId).subscribe(
          () => {
              let index = this.pilotak.findIndex(x=>x.ID == pilotaId);
              this.pilotak.splice(index, 1);
          }
        );
      }
    });
  }

  modositas(pilotaId:number) {
    this.fejleccime = "Módosítás";
    this.ujpilota = this.pilotak.find(x => x.ID == pilotaId)!;

    this.display = true;
  }

  get csapatok() : CsapatModel[] {
    return CsapatModel.csapatokListaja;
  }

}
