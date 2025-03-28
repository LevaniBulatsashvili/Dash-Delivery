// types.ts

export interface WorkingDay {
    day: string;
    startHours: string;
    endHours: string;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    pid: string;
    phoneNumber: string;
    email: string;
    password: string;
    profileImage: string;
    role: string;
    address: { lng: number; lat: number };
  }
  
  export interface Courier {
    id: string;
    firstName: string;
    lastName: string;
    workingDays: WorkingDay[];
  }
  export interface SelectedCourier {
    courierId: string;
    workingDays: WorkingDay[];
  }