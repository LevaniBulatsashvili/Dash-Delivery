interface Field {
    name: string;
    label: string;
    type: "text" | "email" | "password" | "number" | "file" | "select";
    options?: string[];
    required?: boolean;
  }
  
  
  export const baseFields: Field[] = [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phoneNumber", label: "Phone Number", type: "text", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    { name: "profileImage", label: "Profile Image", type: "file", required: false },
  ];

