# Neon Collab

Table of Contents
- [Description](#description)
- [Authors](#authors)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Project Overview & Demos](#project-overview--demos)
   - [Login Page](#login-page)
   - [Problems Page](#problems-page)
   - [Code Editor Page](#code-editor-page)
   - [Feedback Page](#feedback-page)
   - [Profile Page](#profile-page)

## Description
The dream behind Neon Collab is to create a cyber-punk-themed platform where a community of coders can learn and grow their javascript skills together. 

## Authors

- [**Lauren Laxton**](https://github.com/LLaxt)
- [**Paula Yang**](https://github.com/Paula-Yang)
- [**Brandon Gomez**](https://github.com/bgomez9212)
- [**Eric Chang**](https://github.com/ESC8504)
- [**Patrick Alexandre**](https://github.com/palexandre1)

## Built With

- ![](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
- ![](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white)
- ![](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
- ![](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
- ![](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
- ![](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express&logoColor=white)
- ![](https://img.shields.io/badge/-Amazon_AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)
- ![](https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white)
- ![](https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white)
- ![](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
- ![](https://img.shields.io/badge/-Material_UI-0081CB?style=flat-square&logo=material-ui&logoColor=white)
- ![](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

## Getting Started

1. **Clone the repo**
   `git clone https://github.com/Neon-Collab/Neon-Collab`

2. **Navigate to project directory**
   `cd your-project-name`

3. **Install necessary dependencies**
   `npm install`
   `npm run seed`

5. **Update example.config.js and example.env**

6. **Run the application**
   `npm run server-dev`
   `npm run server-dev`

## Project Overview & Demos

## Login Page
The login page utilizes Firebase authentication to create and store account information. New users must choose a unique username, email address, and secure password when creating an account. The custom page graphics are backed by react-particles.
![Login Image](https://media.giphy.com/media/5c9yI20GCkcz8kWkqj/giphy.gif)
## Problems Page
On Monday to Thursday, users are able to see a list of 4 problems and an overall leaderboard for the past 3 weeks. Users will be able to choose one from four problems each week to practice. When clicking on “select problem”, users are directed to the code editor page. On Friday to Sunday, users can see the average score for each problem of the week, as well as a problem-specific ranking including all the users who completed the same problem. 
![Problems Weekday](./client/dist/assets/Problems_Mon-Thu.png)
![Problems Weekend](./client/dist/assets/Problems_Fri-Sun.png)
## Code Editor Page
Once a coding problem is selected, the user will be directed to a text editor page where they will be able to write and run code. Submissions will be tested in an online execution platform/system, and scores will be stored in the backend.
![Code Editor](./client/dist/assets/Code_Editor.png)
## Feedback Page
Based on rankings, the users with the highest scores will be paired with users on the opposite end of the rankings. For example with 10 users, 1st will be paired with 10th, 2nd with 9th and so on. Friday mornings users are greeted with a modal asking for a code review with three separate sections (pros, cons, and suggestions) to optimize learning opportunities for the reviewee. Upon submitting the modal a chat will be available for the pair to continue socializing if they choose to do so. The user’s submitted code will also be displayed to compare against the peer review.
![Feedback1](./client/dist/assets/Feedback_Page.png)
![Feedback2](./client/dist/assets/Feedback_Form.png)
## Profile Page
Displays user information, problem history, total number of problems solved, and their global ranking
![Profile1](./client/dist/assets/Profile_Page.png)
