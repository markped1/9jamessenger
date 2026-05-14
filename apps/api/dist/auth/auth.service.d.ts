export declare class AuthService {
    constructor();
    verifyToken(idToken: string): Promise<import("firebase-admin/lib/auth/token-verifier").DecodedIdToken>;
    getUser(uid: string): Promise<import("firebase-admin/lib/auth/user-record").UserRecord>;
}
