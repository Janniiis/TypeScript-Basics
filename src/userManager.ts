import {v4 as uuidv4} from "uuid";

// User Interface
interface IUser {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer';
}

type AdminUser = IUser& {
    permissions: string[];
}

type CustomerUser = IUser& {
    purchaseHistory: string[]
}

// UserManager Klasse
export class UserManager {
    private users: IUser[];

    constructor() {
        this.users = [];
    }

    // Methoden
    // User hinzufügen
    public addUser(user: IUser): void {
        this.users.push(user);
    }

    // Alle User ausgeben
    public listUsers(): void {
        console.log(this.users)
    }

    // Alle Admins ausgeben
    public getAdmins(): AdminUser[]{
        for (let i = 0; i < this.users.length; i++){
            if (this.isAdmin(this.users[i])){
                return [{
                    id: "123",
                    name: "test",
                    email: "admin@mail.de",
                    role: "admin",
                    permissions: ["WRITE", "DELETE", "EDIT"]
                }]
            } else {
                console.error("User ist kein Admin!")
                return []
            }
        }
    }

    // Alle Kunden ausgeben
    public getCustomers(): CustomerUser[] {
        if (!this.isAdmin(this.users[i])){
            return []
        } else {
            console.error("User ist kein Kunde!")
            return []
        }
    }

    // Type Guards
    // Ist der User ein Administrator?
    public isAdmin(_User: IUser): boolean {
        if (_User.role === 'admin') {
            return true;
        } else {
            console.error("User ist kein Admin!");
            return false;
        }
    }

    // Einzigartige UUID erstellen
    public createUserId(): string {
        return uuidv4();
    }

    // Ist es eine Valide E-Mail Adresse?
    public isValidEmail(user: IUser): boolean{
        if ("@mail.de" in user){
            return true;
        } else {
            console.error("Ungültige E-Mail Adresse!");
            return false;
        }
    }
}
