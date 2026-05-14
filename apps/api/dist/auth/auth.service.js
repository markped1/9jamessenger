"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let AuthService = class AuthService {
    constructor() {
        if (admin.apps.length === 0) {
            try {
                admin.initializeApp({});
                console.log('Firebase Admin initialized successfully');
            }
            catch (error) {
                console.error('Firebase Admin initialization failed:', error.message);
                console.warn('The API will continue to run, but auth features may fail.');
            }
        }
    }
    async verifyToken(idToken) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            return decodedToken;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid Firebase token');
        }
    }
    async getUser(uid) {
        return admin.auth().getUser(uid);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AuthService);
//# sourceMappingURL=auth.service.js.map