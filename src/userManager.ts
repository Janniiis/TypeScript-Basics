import {v4 as uuidv4} from "uuid";
import {writeFileSync} from "fs";

// User Interface
interface IUser {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer';
}

type AdminUser = IUser & {
    permissions: string[];
}

type CustomerUser = IUser & {
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
        if (this.isValidEmail(user.email) && this.isValidUser(user.name)){
            this.users.push(user);
        } else {
            console.log("Invalider Username oder E-Mail Adresse!")
        }
    }

    // Alle User ausgeben
    public listUsers(): void {
        console.log(this.users)
    }

    // Alle Admins ausgeben
    public getAdmins(): AdminUser[] {
        let admins: AdminUser[] = [];
        this.users.forEach(user => {
            if (this.isAdmin(user)) {
                admins.push(user)
            } else {
                console.error("User ist kein Admin!")
            }
        });
        return admins
    }

    // Alle Kunden ausgeben
    public getCustomers(): CustomerUser[] {
        let customers: CustomerUser[] = [];
        this.users.forEach(user => {
            if (this.isCustomer(user)) {
                customers.push(user);
            } else {
                console.error("User ist kein Kunde!");
            }
        });
        return customers;
    }

    // Type Guards
    // Ist der User ein Administrator?
    public isAdmin(_User: IUser): _User is AdminUser {
        if (_User.role === 'admin') {
            return true;
        } else {
            return false;
        }
    }

    // Ist der User ein Kunde?
    public isCustomer(_User: IUser): _User is CustomerUser {
        if (_User.role === 'customer') {
            return true;
        } else {
            return false;
        }
    }

    // Einzigartige UUID erstellen
    public createUserId(): string {
        return uuidv4();
    }

    // Ist es eine Valide E-Mail Adresse?
    public isValidEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Ist es ein Valider Username?
    public isValidUser(name: string): boolean {
        const userRegex = /^[a-zA-Z0-9._-]{3,15}$/
        return userRegex.test(name);
    }

    // Daten in einer JSON Datei speichern
    public saveFileAsJSON(users: IUser[]): void {
        let JSONdata = JSON.stringify(users);
        writeFileSync("file.json", JSONdata, {
            flag: "w"
        });
    }

    // Returned alle User
    public returnAllUsers(): IUser[] {
        return this.users;
    }
}