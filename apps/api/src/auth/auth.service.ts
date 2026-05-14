import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor() {
    if (admin.apps.length === 0) {
      try {
        admin.initializeApp({
          // Note: In production, use service account config
        });
        console.log('Firebase Admin initialized successfully');
      } catch (error) {
        console.error('Firebase Admin initialization failed:', error.message);
        console.warn('The API will continue to run, but auth features may fail.');
      }
    }
  }

  async verifyToken(idToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }

  async getUser(uid: string) {
    return admin.auth().getUser(uid);
  }
}
