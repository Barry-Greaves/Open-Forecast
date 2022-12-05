# Open Forecast

![weather app layouts](https://user-images.githubusercontent.com/107034179/205527393-24a7ad02-8eaf-4c20-8e82-d984f51a6441.png)

Open Forecast is web based weather forescast website which provides a 5 day weather forecast for any city the user chooses. 

Link to [Live Website](https://barry-greaves.github.io/Open-Forecast/)

## Project Goals

The goal of this project was to create a functional weather app that users can visit to aquire up to date weather information.

### User Goals
* To visit the website to check their local weather forecast.
* Be able to plan trips ahead in advance by checking the weather forecast of a different city they are going to visit. 

### Site Owner Goals
* Provide an easy to use weather app
* Deliver accurate real time weather forecast

## User Experience

### Target Audience
* This site will be used by anyone who requires a weather forecast.
* The site can be used by anyone worldwide. 

### User expectations
* Quick and easy to read weather forecasts
* The ability to view 5 day weather forecasts for any city in the world. 

## User Stories

### Site User
* I want to view the todays weahter for my current city. 
* I want to view the weather for this weekend.
* I want to view the wind speeds before I go surfing.
* I want to view the temperature in a city in Europe before I book a last minute holiday.


### Site Owner
* I want the user to understand how to use the website.
* I want the user of the website to search for a city following the prompt in the input box. 

## Design

### Color Scheme
The colors chosen are a bold blue color and white. I wanted to keep the design minimal and functional and decided on a two color scheme to compliment this.

![Screen Shot 2022-12-04 at 23 12 04](https://user-images.githubusercontent.com/107034179/205521393-02d5e2f1-f7b5-47b8-a7bd-bec3be328b59.png)

### Icons
The icons used for the this project were downloaded from [Graphberry Graphic Resource](https://www.graphberry.com/products/download/weather-icons) They were chosen for their clear and minimalist design. 
![Screen Shot 2022-12-04 at 23 06 28](https://user-images.githubusercontent.com/107034179/205521362-99eadfcf-9598-49cc-aa82-8bb16677f717.png)

## Technology Used

### HTML

I used HTML to create the basic structure of the website. 

### CSS

I used CSS to style the basic structure of the website. 

### Javascript

I used javascript to connect the website to the Open Weather Map API. This was done through the use of functions, arrays, variables, event listeners and conditional statements. 

### Open Weather Map
Open Weather API allows programmers to get weather data for any location on the globe immediately. This was connected to the website using Javascript. 

## Features

### Search Input
![Screen Shot 2022-12-04 at 23 15 58](https://user-images.githubusercontent.com/107034179/205521606-580021b6-14ae-4b8d-a9a0-1f67458c6f82.png)

### Current Weather and Statistics
![Screen Shot 2022-12-04 at 23 17 03](https://user-images.githubusercontent.com/107034179/205521657-4ff2f081-54a8-4851-9216-f172a10d304f.png)

### 5 Day Weather Broadcast
![Screen Shot 2022-12-04 at 23 16 08](https://user-images.githubusercontent.com/107034179/205521620-dee22c6e-e954-44c8-a26e-5906d2137487.png)

### Plans for future features.
In the next iteration of this app I plan to create a city suggestion dropdown menu. This will allow users to select from cities that are suggested aftet hey type the first 3 characters of the city they wish to view. 

## Validation & Testing

I tested the I tested the performance of each page using Google Chrome's Lighthouse feature in the Dev Tools. The Website has passed HTML & CSS Vallidation and has scored 100% for Accesibility, Performance and Best Practices and 90% for SEO in lighthouse . 

The javascript was tested in JSHint and came back with 4 warning messages which could not be resolved. The warnings were :'async functions' is only available in ES8 (use 'esversion: 8'). This was due to JSHint not supporting async/await and only up to the maxim version of "esversion" 6.

The results can be seen below. 

### HTML
<img width="1390" alt="Screen Shot 2022-12-04 at 23 14 46" src="https://user-images.githubusercontent.com/107034179/205521551-b601c042-7f20-4e39-af54-ce6f9dfaeb39.png">

### CSS
<img width="1390" alt="Screen Shot 2022-12-04 at 23 13 50" src="https://user-images.githubusercontent.com/107034179/205521550-3e62143b-3fec-426a-9a93-c337840def72.png">

### Lighthouse
<img width="1390" alt="Screen Shot 2022-12-04 at 23 14 46" src="https://user-images.githubusercontent.com/107034179/205521693-09990bcd-5937-4bac-b4f0-60425e584ef5.png">

### JSHint
![Screen Shot 2022-12-05 at 00 26 24](https://user-images.githubusercontent.com/107034179/205525211-308a8ace-b032-43e3-a309-ebca66b6294e.png)

## Deployment

- I created the repository using the [Code Institute Gitpod Template](https://github.com/Code-Institute-Org/gitpod-full-template)
- I selected "Use this template" and then created a new repository using the full template. 
- Once in Github repository I then set up the development environment in Gitpod
- I begun the website by creating an index.html page and css style sheet. 
- I committed all updates through the development process, ensuring they were well defined and included a clear message describing the reason for each commit. 
- The website is hosted on Github pages and the link can be found by navigating to the settings tab of the repoistory and then clicking on 'pages'.
- Live link is available here: https://barry-greaves.github.io/Open-Forecast/

<hr>

## Forking This Project

Fork this project following the steps:
- In Github navigate to github.com/Barry-Greaves/open-forecast/
- Click on 'Fork' located in the top right hand corner of the repository
- Select an owner for the forked repository.
- Click 'create fork'

<hr>

## Cloning This Project

Clone this project following the steps:
- Open GitHub.
- Select the Open Forecast Project
- Click the clipboard icon in order to copy the URL
- Open the terminal.
- Change the current working directory to the location where you want the cloned directory.
- Type 'git clone' and then paste the URL you have copied. 
- Press 'Enter' and your clone has been created. 

<hr>

## Credits

### Code

The code for this is credited to a coding project from [Udemy Build Modern Javascripts Projects Course](https://www.udemy.com/course/the-javascript-course-build-modern-javascript-projects/)

### Icons

The icons used for the this project were downloaded from [Graphberry Graphic Resource](https://www.graphberry.com/products/download/weather-icons)

### Fonts 

The font Forma DJR Banner was licenced from [Adobe Fonts](https://fonts.adobe.com/)
