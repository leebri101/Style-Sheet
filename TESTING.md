<!--# Testing Page of Contents
* [**Development Testing Phase**](#development-testing-phase)
    * [**Manual Testing Phase**](#manual-testing-phase)
    * [**Known Issues and Solutions and Bugs**](#known-issues-and-solutions-and-bugs)
* [**Post Development Testing-Phase**](#post-development-testing-phase)
  * [**Validator Testing**](#validator-testing)
    * [**HTML**](#html---httpsvalidatorw3orgnu)
    * [**CSS**](#css---httpsjigsaww3orgcss-validator)
    * [**JavaScript**](#javascript---httpsjshintcom)
  * [**Lighthouse Scoring**](#lighthouse-scoring)

## **Development Testing Phase**
During development phase of the quiz, I have been manually testing project in two ways:-
    
1. Firstly by publishing the page via GitHub and sharing it with friends and family to test different outcomes and functions within a set controlled environment so that I can see and experiment with the different outcomes, and receive feedback on major and small changes that needed to be rectified.

1. Secondly, continuous self testing the site to ensure that "I" as the creator know what to expect of the site.

### **Manual Testing Phase**
* During the testing phase, I used three different browsers to ensure consistency & cross-platform connectivity. The browsers used in the tests are:

  1. Chrome
  2. Opera GX
  3. Edge
  
* 

* Google Chrome:

No Known issues have been founded running smoothly on Chrome.
![Google-Chrome](doc/screenshots/google-chrome.png)

* Opera GX:

No Known issues have been founded running smoothly on Opera-GX.
![Opera-GX](doc/screenshots/opera-gx.png)

* Microsoft Edge:

No Known issues have been founded running smoothly on Edge.
![Microsoft-Edge](doc/screenshots/microsoft-edge.png)

### **Known Issues and Solutions and Bugs**
* There is only a tiny amount of cosmetic issues which do not hinder the main functionality of the quiz but these will be noted down in their respected numbers for easier understanding. 

* Known Issues:
  * Styling issue with spacing of timer function and text.
  Issue:![QUIZ TIMER](doc/screenshots/quiz-timer.png)
    

* Solutions: 
  * To change some of the styling to ensure that there is more visibility to the user. 

   

* Bugs: 
  * No Bugs have been found when testing.
     
    
## **Post Development Testing Phase**
### **Validator Testing**

#### **HTML** - https://validator.w3.org/nu/

* 0 major errors, 11 warnings have been found mostly due to the lack of headings for the HTML file.

![HTML Validator](doc/screenshots/html-validator.png)


#### **CSS** - https://jigsaw.w3.org/css-validator/

* CSS page has been tested, no issues found via URL or file upload.

![CSS Validator Icon](doc/screenshots/css-validator-icon%20.png)

![CSS Validator Page](doc/screenshots/css-validator.png)


#### **JavaScript** - https://jshint.com/
  
Script JavaScript JSHINT: 
![JSHINT SCRIPT](doc/screenshots/main-script-screenshot.png)


Quiz Questions JSHINT:
![JSHINT QUESTIONS](doc/screenshots/quiz-questions-jshint.png)

Both have no errors only minor issue with quizQuestions on main script as it is just from the quizQuestions script which is linked onto the HTML file. 
### **Lighthouse Scoring**

### **Testing Conditions:**
* Both were tested on the sites both in incognito and as a regular tab due to the fact that running the live link as it is, is affected by the chrome extensions so it was recommended to run the test via incognito to see the difference in performance.
* But i have also asked a small group of people to run the project on their respected devices, desktop running at optimum +90% 

#### **Desktop Version:**
* Same factors at which is affected via desktop
![Incognito-desktop](doc/screenshots/desktop-chrome.png)


* No known issues in regarding performance for desktop testing via incognito.
![Desktop-lighthouse-score](doc/screenshots/desktop-lighthouse-score.png)


**Maintaining the score:**

#### **Mobile Version:**
* Same factor as the desktop lighthouse score 
![Mobile-lighthouse-score](doc/screenshots/mobile-chrome.png)


* Tested via incognito mode on chrome
![Incognito-mobile](doc/screenshots/mobile-lighthouse-score.png)




[Go back to README.md](README.md)
