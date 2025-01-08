import { inject, Injectable } from '@angular/core';
import { fromStorage } from '../util/storage';
import {
  Database,
  onValue,
  ref,
  set,
  get,
  child,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  database: Database = inject(Database);
  deviceID: any = '';

  constructor() {
    this.deviceID = fromStorage('X-Device-ID');
  }

  updateMachine(emissionID: string, performanceData: any) {
    const colectionRef = ref(this.database, `emission/${emissionID}`);
    get(colectionRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dataForm = snapshot.val();
          Object.assign(dataForm, {
            [this.deviceID]: {
              ...dataForm[this.deviceID],
              performance: performanceData,
            },
          });
          set(colectionRef, dataForm).then((response) => {});
        }
      })
      .catch((error) => {});
  }

  createMachine(emissionID: string, deviceID: any) {
    console.log("OK");
    
    this.deviceID = deviceID;
    let dataForm = {
      [deviceID]: {
        presentation: {
          display: 0,
          padding: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            paddingInner: 10,
          },
        },
        setting: {
          createdAt: new Date().toISOString(),
          emissionClient: deviceID,
          emissionID: emissionID,
          name: fromStorage('X-Device-Name') as string,
        },
        performance: {
          version_app: '3.0',
        },
      },
      sportData: {
        remainTime: 0,
        teamAScore: 0,
        teamBScore: 0,

        teamASetScore: 0,
        teamBSetScore: 0,
        teamAGameScore: 0,
        teamBGameScore: 0,
      },
      theme: {
        backgroundColor: 'rgb(233 236 243)',
        primaryColor: '#00274E',
        secondaryColor: 'rgb(233 236 243)',
        thirdColor: '#A0C51E',
        notificationColorText: '#FFF',
        backgroundCard: '#FFF',
        sliderColorActive: '#00274E',
        sliderColorDisabled: '#A0C51E',
      },
    };
    const colectionRef = ref(this.database, 'emission/' + emissionID);
    get(colectionRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          set(colectionRef, dataForm).then((response) => {});
        }
      })
      .catch((error) => {});
  }

  fetchMachine(emissionID: string, callback: Function) {
    const colectionRef = ref(
      this.database,
      'emission/' + emissionID + '/' + this.deviceID
    );
    onValue(colectionRef, (snapshot: any) => {
      const data = snapshot.val();
      callback(data);
    });
  }

  fetchEmission(emissionID: string, callback: Function) {
    const colectionRef = ref(this.database, 'emission/' + emissionID);
    onValue(colectionRef, (snapshot: any) => {
      const data = snapshot.val();
      callback(data);
    });
  }

  updateEmissionSportData(emissionID: string, data: any) {
    const colectionRef = ref(this.database, 'emission/' + emissionID);
    get(colectionRef)
      .then((snapshot: any) => {
        const value = snapshot.val();
        if (snapshot.exists()) {
          const sportData = {
            ...value.sportData,
            ...data,
          };
          let dataForm = {
            ...value,
            sportData,
          };
          set(colectionRef, dataForm).then((response) => {});
        }
      })
      .catch((error) => {});
  }

  fetchEmissionNumber(emissionID: string, callback: Function) {
    const colectionRef = ref(this.database, 'emission/' + emissionID);
    onValue(colectionRef, (snapshot: any) => {
      const data = snapshot.val();
      callback(data);
    });
  }
}
