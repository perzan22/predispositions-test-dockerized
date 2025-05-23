# :globe_with_meridians:Predisposition Test WebApp:globe_with_meridians:

This is an :mortar_board: **academic** :mortar_board: project designed for an educational predisposition test.  
:brain: Candidates complete a test to discover best-suited field of study based on their **personality** and **predispositions**.  
:dart: The main goal of the app is to help future academic students make fulfilling and informed decisions about their academic path.   
:symbols: The application is written in Polish, as it will be deployed by Polish Naval Academy for its prospective students.  

---

## :checkered_flag: Quick start

:whale: Make sure you have Docker installed. 

:inbox_tray: Clone this repository and open it. 
```console
mkdir ./git-sources
cd git_sources
git clone https://github.com/perzan22/predispositions-test-dockerized.git
cd predisposition-test-dockerized
```

:pencil: Copy environmental example to .env file. Leave settings as it already is or change it however you want but let DB_USER and POSTGRES_USER be "postgres".
```console
cp .env.example .env
```
:hammer_and_wrench: Build images and run containers.
```console
docker-compose up --build
``` 
:cyclone: After first start you can use:
```console
docker-compose up
```
:recycle: To rebuilt images and rerun containers use:
```console
docker-compose down
docker-compose up --build
```
:link: While containers are up, run the app in your browser.  
`http://localhost:4200`  

:white_check_mark:The app should be working now. :rocket:  

:cop: You can get into administrator panel by typing:  
`http://localhost:4200/admin`  
Admin credentials:  
login: `admin`  
password: `admin`  

---

## :briefcase: Tech Stack

:artist:**Frontend:** Angular 17  
:gear:**Backend:** Node.js + express  
:elephant:**Database:** PostgreSQL 17  
:whale:**DevOps:** Docker, Docker Compose  
:mailbox_with_mail:**Mailing:** Nodemailer  

---

## :page_with_curl: Application use case summary

:pencil: Main part of the app is the predisposition test. It can be completed by answering all questions which are loaded one after another. Progress bar on the bottom shows the progress. After user completes the test he can know the result after filling in contact form. User get his result on email address he gave. In this test version of the app, user can see the result on the link generated by the backend.  

:cop: By linking to `http://localhost:4200/admin` user can log into administrator panel. Credentials to panel are shwon in [Quick Start](#checkered_flag-quick-start). In this panel admins can add, update and delete questions, answers and fields of study from database. They can also see personal information about candidates whose completed the test. THis information can be exported to Excel sheet file. Admins can also change their password and add new administrators to the database. Passwords in the database are encrypted with [bcrypt](https://www.npmjs.com/package/bcrypt) script.  

---

## :elephant: Database - PostgreSQL 17

This application use PostgreSQL database to store information about test questions, answers, fields of study, candidates, diffrent types of personality and admins credentials. Database relational scheme is shown below:  
![relational_scheme](https://github.com/user-attachments/assets/21b7726a-f881-4b51-b088-b745d2e8d055)  

Relations:  
:memo: Odpowiedz - relation store answers data: content, value and assigned question  
:question: Pytanie - relation store question data: content, instruction, number of answers and type of question  
:question: Typ_pytania - relation store question type data: name and label  
:tada: Wynik_testu - relation store test result data: date, score, candidate who got this result and field of study calculated based on the result  
:mortar_board: Kandydat - relation store candidate data: first name, last name, address city and email  
:school: Kierunek - relation store field of study data: name, department and it's position on the hexagonal model  
:cop: Administrator - relation store administrator data: login and encrypted password  
:information_desk_person: Typ_osobowosci - relation store personality type data: position on hexagonal model, name and label  

---

## :gear: Backend - Node.js + express

Backend is based on **node.js** which is a javascript runtime environment. Node provides powerful console tool **npm** which assures proper installation of necessary libraries and dependencies. It also allows you to run your app in develop mode and helps you build the project.   

**Express** is a node.js framework which provides features to build web API RESTful interfaces. Express helps in creating routes, managing them and handles requests by controllers and allows you to use Model-View-Controller design pattern.  

In this app main server function is handling HTTP requests from clients and communicating with database. It is provided by **pg** library. Backend is also responsible for calculating the result which is done by couple alghorithms based on user answers. Last part is handling connection with SMTP server and mailing. Server uses **nodemailer** library which provides necessary methods.  

---

## :artist: Frontend - Angular 17  

Application frontend is built with **Angular** - framework written in TypeScript. Angular is based on component architecture which allows code reuse and devides application on smaller logical parts.  

Library **RxJS** is a library for making asynchronus and reactive programs by using observables which manage data streams. In the project RxJS is used in lots of components mostly to load data in reactive way.  

App is devided to test components and admin panel components. Components are then recognized by providing them to app module.  

Angular helps developer to manage routing in angular-routing module. This file creates routes which is activated by specific URL. After activation Angular load assigned component to **router-outlet** selector.  

Components are built with 3 main files. HTML file contains view template of course, sass file contains styling and TypeScript file contain component logic and necessary functions.  

Services are files which contain methods assigned to specific models. Services can be injected to components which help to keep the code clean. Those files are used to send HTTP requests from client to API controllers.  

**Angular Material** framework provides additional components which can be added to the HTML files. This components contain clean, user friendly elements which developer can add to make website look good. These components are declared in angular material module.  

--- 

## :school: Field of study classification  

Predisposition test was made based on **John Holland theory**. Main foundation of this theory are 6 personality types which are placed on corners of hexagonal model. Each field of study was placed inside this model. Program calculates user personality type based on the answers and places it on the same model. Each question is assigned to specific type. Answer **no** gives the user 0 points in this type, and answer **yes** gives 1 point. Result is known by calculating weighted average of each type which gives program position of the personality type. Classification is done by finding the closest field of study to the calculated position of personality type.  

--- 

Author: **Olaf Perzanowski**  