# hospital_api

 Designed the server side for a hospital (Only the API)
 Tech Stack: Node.js & Mongo DB
 Hosted URL : https://mshringi.github.io/hospital_api/
 
 # Theme:

    1. Designed an API for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of  COVID-19 patients

    2. There are 2 types of Users
    • Doctors
        ◦ Doctors can register with 4 fields
            ▪       name : “xyz”
            ▪ username: “abc” (username should be unique)
            ▪ password: “******”
            ▪ confirm_password: “******”(password and confirm_password should be same)
        ◦ Doctors can login with 2 fields(used with registered)
            ▪ username: “”
            ▪ password: “”
    • Patients
        ◦ Patients have 2 fields
            ▪ name: “pqrs”
            ▪ phone_number: 9999999999(No. Should be unique)

    3. Doctors can log in
    • Each time a patient visits, the doctor will follow 2 steps
        ◦ Register the patient in the app (using phone number, if the patient already exists, just return the patient info in the API)
        ◦ After the checkup, create a Report
    • Patient Report will have the following fields
        ◦ Created by doctor
        ◦ Status (Used enums):
            ▪ Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit]
        ◦ Date

    4. Routes and URL
        ◦ http://localhost:8822/api/v1/doctors/register → with username and password
        ◦ http://localhost:8822/api/v1/doctors/login → returns the JWT to be used
        ◦ http://localhost:8822/api/v1/patients/register 
        ◦ http://localhost:8822/api/v1/patients/:id/create_report
        ◦ http://localhost:8822/api/v1/patients/:id/all_reports → List all the reports of a patient oldest to latest
        ◦ http://localhost:8822/api/v1/reports/:status  → List all the reports of all the patients filtered by a specific status
