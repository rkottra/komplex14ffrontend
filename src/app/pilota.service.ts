import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { PilotaModel } from './models/pilota.model';

@Injectable({
  providedIn: 'root'
})
export class PilotaService {
  
  public token:string = "";

  constructor(private http:HttpClient) {
      this.http.get("http://localhost:8000/api/token", {responseType: 'text'}).toPromise().then(
        (szerverrolvissza) => {
          this.token = szerverrolvissza;
          console.log(this.token);
        }
      )
  }

  getPilotak():Observable<PilotaModel[]> {
    return this.http
            .get<any[]>("http://localhost:8000/api/pilotak", {headers: {
              'X-CSRF-TOKEN': this.token,
              'token': this.token,
              '_token': this.token,
              'csrf-token': this.token,
            }}).pipe(
              map((adatok) => {
                let seged: PilotaModel[] = [];
                
                for (let index = 0; index < adatok.length; index++) {
                  const adatsor = adatok[index];
                  
                  let pilota :PilotaModel = new PilotaModel(adatsor);
                  seged.push(pilota);

                }

                return seged; 
              })
            );
  }

  deletePilota(pilotaId: number):Observable<any> {
    return this.http.delete("http://localhost:8000/api/pilotak/"+pilotaId, {headers: {
        'X-CSRF-TOKEN': this.token,
        'token': this.token,
        '_token': this.token,
        'csrf-token': this.token,
      }
    })
  }

}
