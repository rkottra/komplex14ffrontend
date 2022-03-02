import { CsapatModel } from "./csapat.model";

export class PilotaModel {
    public ID: number = 0;
    public nev: string = "";
    public magassag: number = 0;
    public szuletes: number = Date.now();
    public nemzet:string = "";

    public csapat:CsapatModel = new CsapatModel("");

    constructor(szerverrolErkezettAdat:any = null) {
        
        if (szerverrolErkezettAdat === null ) {
             
        }else {
            this.ID = szerverrolErkezettAdat.ID;
            this.nev = szerverrolErkezettAdat.nev;
            this.nemzet = szerverrolErkezettAdat.nemzet;
            this.szuletes = szerverrolErkezettAdat.szuletes;
            this.magassag = szerverrolErkezettAdat.magassag;

            if (CsapatModel.csapatokListaja.find(x=> x.nev == szerverrolErkezettAdat.csapatnev) !== undefined)  {
                this.csapat = CsapatModel.csapatokListaja.find(x=> x.nev == szerverrolErkezettAdat.csapatnev)!;
            } else {
                this.csapat = new CsapatModel(szerverrolErkezettAdat);
            }
        }
        
        

        
    }
}