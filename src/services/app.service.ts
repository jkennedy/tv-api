import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {UserEntity} from '../entities/user.entity';
import {SaveLocationDto} from '../dtos/saveLocation.dto'
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';


@Injectable()
export class AppService implements OnModuleInit {
  constructor(private firebaseAuth: FirebaseAuthenticationService, private fireStore: FirebaseFirestoreService) { }

  onModuleInit() {
     console.log(`The module has been initialized.`);
     let db = this.fireStore;
     db.settings({ ignoreUndefinedProperties: true });
  }

  getUsers() {
    return this.firebaseAuth.listUsers()
  }

  collection() {
    return this.fireStore.listCollections();
  }

  async getCity() {
    let db = this.fireStore;
    const cityRef = db.collection('cities').doc('SF');
    const doc = await cityRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }

    return doc.data();
  }

  async createCities() {
    let db = this.fireStore;
    const citiesRef = db.collection('cities');

    await citiesRef.doc('SF').set({
      name: 'San Francisco', state: 'CA', country: 'USA',
      capital: false, population: 860000
    });
    await citiesRef.doc('LA').set({
      name: 'Los Angeles', state: 'CA', country: 'USA',
      capital: false, population: 3900000
    });
    await citiesRef.doc('DC').set({
      name: 'Washington, D.C.', state: null, country: 'USA',
      capital: true, population: 680000
    });
    await citiesRef.doc('TOK').set({
      name: 'Tokyo', state: null, country: 'Japan',
      capital: true, population: 9000000
    });
    await citiesRef.doc('BJ').set({
      name: 'Beijing', state: null, country: 'China',
      capital: true, population: 21500000
    });

  }
}
