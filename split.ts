export class splits {

    public zoneA: number[][];
    public zoneB: number[][];
    public zoneC: number[][];
    public zoneD: number[][];

    private zoneE: number[][];
    private zoneF: number[][];

    private zoneG: number[][];
    private zoneH: number[][];

    private audioData: any;

    public constructor(pAudioData: any) {
        this.zoneA = [];
        this.zoneB = [];
        this.zoneC = [];
        this.zoneD = [];
        this.zoneE = [];
        this.zoneF = [];
        this.zoneG = [];
        this.zoneH = [];
        this.audioData = pAudioData;
    }

    public splitSong() {
        var audioLength = this.audioData.channelData[0].length;// largo del audio
        var firstTime: boolean = true;
        var lastZone: number = 0;
        var nowZone: number = 0;

        var point: number;//temp para guardar los datos de una zona 
        var zone: number[] = [];//temp para guardar los datos de una zona 


        for (var i = 0; i < audioLength; i++) {

            point = this.audioData.channelData[0][i];

            if (!firstTime) {// sino es la primera vez

                // asigna nuevo valor a nowZone
                if (point >= 0.5) { nowZone = 1 }
                else if (point >= 0) { nowZone = 2 }
                else if (point >= -0.5) { nowZone = 3 }
                else { nowZone = 4 }

                if (lastZone == nowZone) {// si las zonas son iguales sigue anadiendo puntos
                    zone.push(point);
                }
                else {//si las zonas cambian o sea se brinca de una zona a otra 
                    this.insertZone(lastZone, Object.assign([], zone));// guarda los datos de toda la zona pasada
                    zone = [];// refresca el temp de lazona
                    lastZone = nowZone;
                    zone.push(point);//guarda el punto 
                }
            } else {// solo para el primer caso
                zone.push(point);
                if (point >= 0.5) { lastZone = nowZone = 1 }///ZONE A
                else if (point >= 0) { lastZone = nowZone = 2 }//ZONE B
                else if (point >= -0.5) { lastZone = nowZone = 3 }// ZONE C
                else { lastZone = nowZone = 4 }// ZONE D
                firstTime = false;
            }
        }
    }

    private insertZone(pZoneNumber: number, pZone: number[]) {
        switch (pZoneNumber) {
            case 1: {
                this.zoneA.push(pZone);
                break;
            }
            case 2: {
                this.zoneB.push(pZone);
                break;
            }
            case 3: {
                this.zoneC.push(pZone);
                break;
            }
            case 4: {
                this.zoneD.push(pZone);
                break;
            }
            case 5: {
                this.zoneE.push(pZone);
                break;
            }
            case 6: {
                this.zoneF.push(pZone);
                break;
            }

        }
    }

    public getZone(zone: number): (number[][]) {
        switch (zone) {
            case 1: {
                return this.zoneA;
            }
            case 2: {
                return this.zoneB;
            }
            case 3: {
                return this.zoneC;
            }
            case 4: {
                return this.zoneD;
            }
        }
        return this.zoneE;
    }














}