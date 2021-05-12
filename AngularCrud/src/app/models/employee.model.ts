export class Employee {
    id: number;
    name: string;
    gender: string;
    email?: string;
    phoneNumber?: string;
    contactPreference: string;
    dateOfBirth: Date;
    // department: string;
    departmentId: number;
    isActive: boolean;
    photoPath?: string;
}