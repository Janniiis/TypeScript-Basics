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
        let admins: AdminUser[] = [];
        for (let i = 0; i < this.users.length; i++){
            const user = this.users[i];
            if (this.isAdmin(user)){
                admins.push(user)
            } else {
                console.error("User ist kein Kunde!")
            }
        }
        return admins
    }

    // Alle Kunden ausgeben
    public getCustomers(): CustomerUser[] {
        let customers: CustomerUser[] = [];
        for (let i = 0; i < this.users.length; i++){
            const user = this.users[i];
            if (this.isCustomer(user)){
                customers.push(user)
            } else {
                console.error("User ist kein Kunde!")
            }
        }
        return customers
    }

    // Type Guards
    // Ist der User ein Administrator?
    public isAdmin(_User: IUser): _User is AdminUser {
        if (_User.role === 'admin') {
            return true;
        } else {
            console.error("User ist kein Admin!");
            return false;
        }
    }

    public isCustomer(_User: IUser): _User is CustomerUser {
        if (_User.role === 'customer') {
            return true;
        } else {
            console.error("User ist kein Kunde!");
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