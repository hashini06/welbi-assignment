/*
Developer - Hashini De Silva (hashinids@gmail.com)
Date - 2021-03-16
*/

export class Attendence {
    residentId: String;
    status: String;
    author: String;

    constructor(residentId: String, status: String, author: String) {
        this.residentId = residentId;
        this.status = status;
        this.author = author;
    }
}