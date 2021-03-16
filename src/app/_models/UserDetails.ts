/*
Developer - Hashini De Silva (hashinids@gmail.com)
Date - 2021-03-16
*/

export class UserDetails {
    id: String;
    firstName: String;
    lastName: String;
    name: String;
    room: String;
    levelOfCare: String;
    ambulation: String;
    birthDate: Date;
    moveInDate: Date;

    constructor(id: String, firstName: String, lastName: String, name: String, room: String, levelOfCare: String,
        ambulation: String, birthDate: Date, moveInDate: Date) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = name;
        this.room = room;
        this.levelOfCare = levelOfCare;
        this.ambulation = ambulation;
        this.birthDate = birthDate;
        this.moveInDate = moveInDate;
    }
}