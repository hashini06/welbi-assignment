import { Attendence } from './attendence';
import { Hobbies } from './hobbies';

export class ProgramDetails {
    id: String;
    name: String;
    location: String;
    allDay: Boolean;
    start: Date;
    end: Date;
    tags: String[];
    attendance: [Attendence];
    dimension: String;
    facilitators: String[];
    levelOfCare: String[];
    hobbies: [Hobbies];
    isRepeated: Boolean;


    constructor(id: String, name: String, location: String, allDay: Boolean, start: Date, end: Date,
        tags: String[], attendance: [Attendence], dimension: String, facilitators: String[], levelOfCare: String[],
        hobbies: [Hobbies], isRepeated: Boolean) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.allDay = allDay;
        this.start = start;
        this.end = end;
        this.tags = tags
        this.attendance = attendance;
        this.dimension = dimension;
        this.facilitators = facilitators;
        this.levelOfCare = levelOfCare;
        this.hobbies = hobbies;
        this.isRepeated = isRepeated;
    }
}