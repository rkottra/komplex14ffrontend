export class CsapatModel {
    public ID: number = 0;
    public nev: string = "";
    public nemzet: string = "";

    public static csapatokListaja:CsapatModel[] = [];

    constructor(szerverrolErkezettAdat:any = null) {
        
        if (szerverrolErkezettAdat !== null)
        {
            this.ID = szerverrolErkezettAdat.csapatID;
            this.nemzet = szerverrolErkezettAdat.csapatnemzet;
            this.nev = szerverrolErkezettAdat.csapatnev; 
            
            CsapatModel.csapatokListaja.push(this);
        }
        
    }
}