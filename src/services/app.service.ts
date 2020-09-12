import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {UserEntity} from '../entities/user.entity';
import {SaveLocationDto} from '../dtos/saveLocation.dto'
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';


@Injectable()
export class AppService implements OnModuleInit {
  constructor(private firebaseAuth: FirebaseAuthenticationService, private fireStore: FirebaseFirestoreService) { }

  onModuleInit() {
     let db = this.fireStore;
     db.settings({ ignoreUndefinedProperties: true });
  }

  getUsers() {
    return this.firebaseAuth.listUsers()
  }

  collection() {
    return this.fireStore.listCollections();
  }
}
