import {UserManager} from './userManager';

// UserManager
const userManager = new UserManager();

// UserId
let userId: string;

// UserId vergeben & User erstellen
userId = userManager.createUserId();
userManager.addUser({
    id: userId,
    name: "jannis",
    email: "jannis@mail.de",
    role: "admin"
});
userId = userManager.createUserId();
userManager.addUser({
    id: userId,
    name: "erik",
    email: "erik@mail.de",
    role: "customer"
});
userId = userManager.createUserId();
userManager.addUser({
    id: userId,
    name: "julia",
    email: "julia@mail.de",
    role: "admin"
});
userId = userManager.createUserId();
userManager.addUser({
    id: userId,
    name: "arne",
    email: "arne@mail.de",
    role: "customer"
});

// Alle User ausgeben
userManager.listUsers()

// Alle Admins ausgeben
console.log(userManager.getAdmins())

// Alle Kunden ausgeben
console.log(userManager.getCustomers())

// Daten in JSON Datei speichern
userManager.saveFileAsJSON(userManager.returnAllUsers())