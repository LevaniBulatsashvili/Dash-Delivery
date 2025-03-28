// import { useState, useEffect } from "react";
// import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
// import axios from "axios";
// import Navbar from "../navbar/Navbar";
// import { Courier, SelectedCourier, User, WorkingDay } from "../Types";



// const UserPage: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [couriers, setCouriers] = useState<Courier[]>([]);
//   const [selectedCouriers, setSelectedCouriers] = useState<SelectedCourier[]>([]);
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     console.log("API KEY:", import.meta.env.VITE_API_KEY);

//     // Fetch user data
//     axios.get(`https://crudapi.co.uk/api/v1/user`, {
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
//         Accept: "application/json"
//       },
//     }).then(response => {
//       console.log("User Data:", response.data);
//       setUser(response.data);
//     }).catch(error => console.error("Error fetching user data:", error));

//     const courierData: Courier[] = [
//       {
//         id: "1",
//         firstName: "მალხაზ",
//         lastName: "მამიშვილა",
//         workingDays: [
//           { day: "Monday", startHours: "09:00", endHours: "18:00" },
//           { day: "Tuesday", startHours: "09:00", endHours: "18:00" },
//         ],
//       },
//       {
//         id: "2",
//         firstName: "მარიამი",
//         lastName: "მიქაძე",
//         workingDays: [
//           { day: "Wednesday", startHours: "10:00", endHours: "17:00" },
//           { day: "Thursday", startHours: "10:00", endHours: "17:00" },
//         ],
//       },
//     ];
//     setCouriers(courierData);
//   }, []);

//   const handleUpdate = () => {
//     axios.put(`https://crudapi.co.uk/api/v1/user`, user, {
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
//         Accept: "application/json"
//       },
//     }).then(() => alert("User updated successfully!"))
//       .catch(error => console.error("Error updating user:", error));
//   };

//   const handleCourierSelection = (courierId: string, workingDays: WorkingDay[]) => {
//     const hasConflict = selectedCouriers.some(selected =>
//       selected.workingDays.some(day =>
//         workingDays.some(newDay =>
//           day.day === newDay.day &&
//           ((day.startHours >= newDay.startHours && day.startHours < newDay.endHours) ||
//             (newDay.startHours >= day.startHours && newDay.startHours < day.endHours))
//         )
//       )
//     );

//     if (hasConflict) {
//       alert("Selected courier's working hours conflict with an already selected courier.");
//       return;
//     }

//     setSelectedCouriers([...selectedCouriers, { courierId, workingDays }]);
//   };

//   return (
//     <>
//       <Navbar/>
//       <div className="p-6 space-y-4">
//         {user && (
//           <Card>
//             <CardContent>
//               <Typography variant="h5" className="mb-2.5">User Information</Typography>
//               <TextField
//                 label="First Name"
//                 fullWidth
//                 value={user?.firstName || ""}
//                 onChange={(e) => setUser({ ...user, firstName: e.target.value })}
//               />
//               <TextField
//                 label="Last Name"
//                 fullWidth
//                 value={user?.lastName || ""}
//                 onChange={(e) => setUser({ ...user, lastName: e.target.value })}
//               />
//               <TextField
//                 label="Phone Number"
//                 fullWidth
//                 value={user?.phoneNumber || ""}
//                 onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
//               />
//               <TextField
//                 label="Email"
//                 fullWidth
//                 value={user?.email || ""}
//                 onChange={(e) => setUser({ ...user, email: e.target.value })}
//               />
//               <TextField
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 value={user?.password || ""}
//                 onChange={(e) => setUser({ ...user, password: e.target.value })}
//               />

//               <Button variant="contained" color="primary" onClick={handleUpdate}>
//                 Update Info
//               </Button>
//             </CardContent>
//           </Card>
//         )}

//         <Card>
//           <CardContent>
//             <Typography variant="h5">Available Couriers</Typography>
//             {couriers.length > 0 ? (
//               couriers.map((courier) => (
//                 <Card key={courier.id} className="mb-4 p-4 border">
//                   <Typography variant="h6">{courier.firstName} {courier.lastName}</Typography>
//                   <Typography>Working Days:</Typography>
//                   <ul>
//                     {courier.workingDays.map((day) => (
//                       <li key={day.day}>{day.day}: {day.startHours} - {day.endHours}</li>
//                     ))}
//                   </ul>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => handleCourierSelection(courier.id, courier.workingDays)}
//                   >
//                     Request Courier
//                   </Button>
//                 </Card>
//               ))
//             ) : (
//               <Typography>No couriers available at the moment.</Typography>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default UserPage;






