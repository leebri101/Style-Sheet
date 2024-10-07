<!--# **Style-Sheet**
Front-End Plus Project 3(Final):- E-commerce site with AI Chat bot capabilities 
## **Site Preview**
### Live link
()
## Contents-Page:
1. [**Project-Planning**](#project-planning)
    * [**Target Audiences**](#target-audiences)
    * [**User Stories**](#user-stories)
    * [**Site Objectives**](#site-objectives)
    * [**Wire-Frames**](#wire-frames)
    * [**Reused Code**](#reused-code)
1. [**Current Features on all pages**](#current-features-on-all-pages)
    * [**Home-Page:**](#home-page)
        * [*Title*](#title)
        * [*Call To Action Button*](#call-to-action-button)
        * [*Start-Game-Section*](#start-game-section)
    * [**Quiz-section:**](#quiz-section)
        * [*Quiz-Tracker*](#quiz-tracker)
        * [*Q&A-Section*](#question--answers)
    * [**Results-Section**](#results-section)
    * [**Footer**](#footer)
    * [**Typesetting**](#typesetting)
1. [**Potential-Features**](#future-enhancements)
1. [**Testing Phase**](#testing-phase)
1. [**Deployment**](#deployment)
1. [**Credits**](#credits)
    * [**Honorable mentions**](#honorable-mentions)
    * [**General reference:**](#general-reference)
    * [**Content**](#content)
    * [**Media**](#media)

## **Project Planning**
### **Target Audiences:**
* For users who want to be able to enjoy a short quiz.
* For users who enjoy a short interactive game.

### **Site Objectives:**
* Allowing users to easily interact with the page without any technical or difficult complications. 
* To create a simple, effective and user-friendly quiz page which anyone can use or take inspiration from.

### **User Stories:**
* As a user I want to be able to navigate the site with ease.
* As a user I want to enjoy being able to do a short quiz that doesn't make it long or boring.
* As the owner I want to be able to see a simple but smooth transition in animations used in the quiz. 
* As the owner I want to be able to allow users to feel comfortable with interacting with the simple commands. 

### **Wire-Frames:**
* To prevent any digressions towards the project aims & objectives I have made a basic but extensive wire-frame via [Figma](https://www.figma.com/board/vHAspXeCOVMmQAK0wSd84j/StyleSheet?node-id=0-1&node-type=CANVAS&t=HRVwgh8QWqaWblSD-0) to refer back to in case of any major changes to the project. 

[Wireframes](doc/wireframes/) were all designed in Figma for a more simple but effective design. 
* [Landing-Page](doc/wireframes/landing-page.png)
* [Placeholder-name](doc/wireframes/placeholder-name.png)
* [Q&A Section](doc/wireframes/q-and-a.png)
* [Results-section](doc/wireframes/feedback.png)

There have been some considerable cosmetic changes to the static site to improve the UX, however most of design was kept to original plan on the wire-frames. Some of these changes may include:-
* An interactive CTA(Call-To-Action) button for the user to use.
* A placeholder which prompts users to enter their name to start the quiz.
* A mixture 10 of cooking/food related questions which are randomized, with 4 options at which the user is prompted to answer the question.
* A Results/Feedback pop-up which displays the users score and a funny custom message (dependant on the range of the score) to the user as well as a animated image or GIF. 

### **Reused Code:**
* Some of the code that has been used in this project have been re-used from the previous projects due to the simple and effective structure it has on the layout of the final design.
    * All links have the same hover-over effect at which it changes color and size upon hovering.
    * Once clicked it will change color. 
        * Miscellaneous reused content:
        
        ![Generic-Reused code](doc/screenshots/reused-code.png)

        * Reused root structure code for simplicity of selecting the same colors.
        ![Reused root code](doc/screenshots/reused-root-code.png)
***
### **Current Features**
####  **Home-Page:**
* The home-page will have multiple unique features which the user can do upon navigating which will contain these most notable features:

### *Title:*
* The Title will include some unique features:-
    * The main title of the page includes a two tone text to keep within theme of a restaurant.
    * Upon loading a animation with the title will appear and shifts the letters of the title.
    * And small cookware icon within the title.

![Title](doc/screenshots/title.png)

### *Call To Action Button:*
* A hover-over design to be able at which users can interact with , which instantly grabs the users attention.
![Home-page](doc/screenshots/main-page.png) 
    * A simple but clean hover over effect where it transitions into a dark navy blue to match the theme of the page.
    * An active page navigation where it allows the user to hover over the different page links and show which page they are currently on.  
    * Direct web-links where it take the user to my GitHub so that they can manually view each of my projects. 
    
    
* Mobile version of home page with title, icon, buttons and web-links.
![Mobile-version of CTA](doc/screenshots/mobile-cta.png)

### **Start-Game-section:**
* Upon clicking into into the CTA button it will enter into teh start-game section with a autofocus placeholder text box which prompts users to enter a name, allowing for more accessibility to users, which is useful on mobile devices, as a text cursor is already highlighted within the text box which saves time for users to manually navigate.  

    * An error handler will display as a red border within the text box if the user has not provided a name or text. 

* It also has two interactive buttons for input, one which is to Start Game which users must enter a name, manually click on the button to start the game/quiz, and teh quit button which it will take the user back onto the main screen where it will display the CTA button.
    * An event listener is in place where the user has the option to press ENTER which wil have the same response as clicking the Start-Game button.
![Start-Game-Section](doc/screenshots/start-game.png)

***
### **Quiz-Section:**
Within the quiz section i will highlight/summarize each of the most notable features of the quiz section. 

#### *Quiz-Tracker:*
Features used:
* An indicator is displayed on the top of the question which tracks the current question the user is on.
* A timer is also in place with an animation which shakes each time a second is lost within the alloted time length of 30 seconds.
* A time bar is also there to track the alloted time left on the quiz, however each time a second is lost the bar is reduced in size which will go from green, to yellow and red and will restart.
![Quiz-Tracker](doc/screenshots/quiz-timer.png)

### **Question & Answers:**
Features used:
* Users will be given the option to select 4 options within the answer boxes. 
* Users must select an answer before clicking next to proceed onto the next question.
* Each question will have a hover-over effect which will change the color of the choices at which the user can select to answer the question, which also changes color upon clicking an answer. 
* Question Shuffler which enables all 24 questions that have been created in the questions.js script to be shuffled using the [Fisher-Yates](https://bost.ocks.org/mike/shuffle/) method in a random given order out of ten so no question is used twice.

![Q&A Section](doc/screenshots/q-and-a-hover-&-click.png)

### **Point-Tracker**
Below the quiz is a score-tracker which displays to the user the following things:
* To show which question they are currently on
* Whether they have answered the question correctly.
* Answered incorrectly.
* Skipped or did not answer a question.
    * Which will be represented in these colors:
        * Yellow = The current question
        * Green = Correct Answer
        * Red = Wrong answer
        * Gray = Skipped or Unanswered

![Point-Tracker](doc/screenshots/quiz-tracker.png)

***
### **Results-Section**
The results page will have the following features:
* A score rating out of 10.
* A feedback message dependant on the score.
* The function to allow users to play again.
* An animated gif which is also dependant on the score of which the user has scored out of 10. 
    * As a note most of the gifs used in this were all food/cooking related: 
        * From Gordon Ramsey to his iconic "Idiot Sandwich Sketch".
        * To great acting of Jeremy Allen White from the hit Series of "The Bear".
        * To the iconic meme of Adam Driver saying "Good soup".

Below i will show case the possible outcomes at which the user can get each message with the gifs in the outcomes of the score range:
* Ranging from 0 to 3![Results-0/3](doc/screenshots/results-0-to-3.png)

* Ranging from 3 to 6![Results-3/6](doc/screenshots/results-3-to-6.png)

* Ranging from 6 to 9![Results-6/9](doc/screenshots/results-6-to-9.png)

* Ranging from 9+ or = 10![Results-9+](doc/screenshots/results-9+.png)

### **Footer:**
The footer page has a wave animation at which it is only used for display purposes which blends in very well with the background. 
* These are the features that have been used in the footer:
    * All the icons that were used in the project have been sourced by through Font Awesome. 
    * A personal copyright has been added in-case of plagiarism.
    * A personal link to my GitHub page which users can track my coding journey.

![Footer](doc/screenshots/footer.png)

## **Typesetting**
 Throughout the Project Portfolio only two fonts was used throughout for consistency:
  * Quattrocento:- For the classic french bistro typography look. 

  * Cormorant Garamond:- Similar to Quattrocento but more of a softer look for the text. 

* Please note that all fonts that have used in the project have been sourced from Google Fonts (quoted in the credits).

## **Potential-Features**
*  Through some experimentation and testing throughout the quiz I have wanted to make a quiz that is more simple, effective and interactive as possible previous from the first quiz I made from my previous project with future things to add:
    * Having an interchangeable leader-board which allows other users/players to see their rankings at the end of the results page. Which will change frequently upon the score of each individual.
    * Simple sound bites for depending on results.
    * A Quiz at which the user can select upon the difficulty at which that challenge. 
## **Testing-Phase**
Full details of the testing phase can be found here: [TESTING.md](TESTING.md)

## **Deployment**
The project has been deployed with the following steps:-

1. Within the project's [repository](https://github.com/leebri101/Tech-Savvy), you select the **Settings** tab.
2. Then select the **Pages** menu tab on the left side.
3. Under **Source** then, select the **Main** branch from the drop-down menu and click **Save**.
4. A message will then pop up that the project has been successfully deployed with a live link.

You can visit the live link via this URL or on the top the README file- [Chef-De-Party](https://leebri101.github.io/Chef-de-Party/)


## **Credits**
### **Honorable mentions**
It was a nice refresher for me to comeback and re-learn JavaScript and to see how much I can make the quiz a lot better compared to the first one that I have created from the previous course that I attended, but however it was refreshing to see how much I can improve and learn, thinking beyond from last year from learning it from scratch to continuously think. "How can I make this better? What can I do to make it standout more? Or I think this would look better". From this I can see from myself that i have more qualities of being a good Web Developer (but there is  always room for improvement), but i must credit the following people:
 * John Lamontagne my coding mentor who is amazing at giving me advice, tips & tricks for always improving my projects, not only on a curricular base level, but in a real life perspective too, and to always make me think on the perspective of both teh user/owner, always giving a thorough analysis to ensure that I always achieve my highest potential as an upcoming developer 

* My older brother for always being available for being a personal guinea pig for my projects (and as a non-coding person) and (with many more to come) and giving me constant constructive critical feedback all the time.

### **General reference:**
* The project theme was based around a similar concept of the previous project i have made in the past, but of a different theme I made but with more changes to make it more effective, functional and clean with little to no bugs as possible to ensure a higher accuracy of clean code as good practice for entering into the industry, but to also make a fun short quiz for users to play. 

* I have used W3Schools for a basic understanding and learning process for knowing some basic functionality as a way of reminding some stuff, and for general basic coding references and as general encyclopedia for any code related issues or ideas, some of the designs for the main parts of the page are taken from inspiration from CodePen (but were not used they may have been used a visual reference).

### **Content:**
* All icons that were used throughout the project are sourced from [Font-Awesome](https://fontawesome.com/)
* All fonts used have been imported from - [Google-Fonts](https://fonts.google.com/)

### **Media:**
* Color picker site [Image Color Picker](https://imagecolorpicker.com/)
* Image compressions: [TinyPNG](https://tinypng.com/) 
* For the basic and simple wire-frame design as a professional and practical project planning platform [Figma](https://www.figma.com/?fuid=).
* Alternative image converter [FreeConvert](https://www.freeconvert.com/).
* Image compress/converter [Convertio](https://convertio.co/). 
* Google fonts for restaurants [Medium](https://medium.com/bentobox-design/font-pairings-our-favorite-google-fonts-for-restaurants-d157e4c5e5fd).
* First color palette [Color Hex](https://www.color-hex.com/color-palette/10105)
* Second color palette [Color Hex](https://www.color-hex.com/color-palette/67983)
* Background 
Image [Unsplash](https://unsplash.com/photos/stainless-steel-cooking-pots-on-stove-0EkWTSFXwCc)
* GIFs used in results section [Giphy](https://giphy.com/)
* 
