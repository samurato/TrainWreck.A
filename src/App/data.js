// Global
export const UserLoggedOn = "Admin";
export const UserPermissions = "Administrator";
export const bearer = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDhjNTczZDY0Mzc1MTA4NTQ3OTNiMTAiLCJuYW1lIjoicm9vdCBhY2NvdW50IiwiZW1haWwiOiJyb290QG1haWwuY29tIiwidXBkYXRlZF9hdCI6IjIwMTktMDktMjZUMDY6MTQ6MjEuNzE4WiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU2OTQ4MTQ0NCwiZXhwIjoxNTY5NjU0MjQ0fQ.kf78MwAt-m6r36BDcCzgvqy5knX-BgQ3ZVFAwhJaReA';

//export const EndpointAPIURL = "172.19.126.129";
export const EndpointAPIURL = "trains.benfranzi.com:8080"
export const EndpointWSURL = "trains.benfranzi.com:8081"

// Display
export let ActiveView = "Trains";
export let ActivePageTitle = "Dashboard";

export const LineColours = {
  "T1": "#F89C1C",
  "T2": "#0097CD",
  "T3": "#F36421",
  "T4": "#015AA5",
  "T5": "#C32190",
  "T6": "#436CAB",
  "T7": "#6E818E",
  "T8": "#008A45",
  "T9": "#008A45",
  "Blue Mountains Line": "#F79210",
  "Central Coast & Newcastle Line": "#D31B2E",
  "South Coast Line": "#1F57A9",
  "Southern Highlands Line": "#0B974A",
  "Hunter Line": "#802630"
}

// Active lists
export const TrainsData = [
  {id: 1, name: "Train #1", route: "Central → Paramatta", line: "T2"},
  {id: 2, name: "Train #2", route: "Clyde → Carlingford", line: "T6"},
  {id: 3, name: "Train #3", route: "Central → Lithgow", line: "Blue Mountains Line"},
  {id: 4, name: "Train #4", route: "Central → Macarthur via Revesby", line: "T8"}
];

export const UsersData = [
  {id: 1, name: "Admin", permissions: "Administrator", image: ""},
  {id: 2, name: "John Doe", permissions: "User", image: ""},
  {id: 3, name: "Mary Arkham", permissions: "User", image: ""},
]

// Sensors


