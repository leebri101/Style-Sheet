**Style-Sheet**
Front-End Plus Project 3(Final):- E-commerce site with (mimic of popular site Uniqlo/END)
## **Site Preview**
### Live link
(https://leebri101.github.io/style-sheet/)
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
* For users who want to be able purchase items off a makeshift fashion website.
* For users who want to look new fashionable items of clothing.
* For users who want to be able to take inspiration in creating their own E-commerce business.

### **Site Objectives:**
* Allowing users to easily interact with the page without any technical or difficult complications. 
* To create a simple, effective and user-friendly page which anyone can use or take inspiration from.

### **User Stories:**
* As a user I want to be able to navigate the site with ease.
* As a user I want to purchase/save/store items with ease.
* As the owner I want to be able to see a simple but smooth transition with a minimalistic look to  
* As the owner I want to be able to allow users to feel comfortable with interacting with the simple commands. 
* As the owner i want to be able to manually input products at ease.
* As the owner i want to be able to maintain the site with a minimalistic look to it.


### **Wire-Frames:**
* To prevent any digressions towards the project aims & objectives I have made a basic but extensive wire-frame via [Figma](https://www.figma.com/board/vHAspXeCOVMmQAK0wSd84j/StyleSheet?node-id=0-1&t=wVfkPLIDmJAOUdCn-1) to refer back to in case of any major changes to the project. 

[Wireframes] (docs/wireframes) were all designed in Figma for a standard structure and guidelines for main design. 
* [wireframes](src/assets/docs/wireframes)
* [](doc/wireframes/placeholder-name.png)
* [](doc/wireframes/q-and-a.png)
* [](doc/wireframes/feedback.png)

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

### *Logo-Icon*
* The Title will include some unique features:-
    * The main title of the page includes a two tone text to keep within theme of a restaurant.
    * Upon loading a animation with the title will appear and shifts the letters of the title.
    * And small cookware icon within the title.

![Title](doc/screenshots/title.png)

### **
* A hover-over design to be able at which users can interact with , which instantly grabs the users attention.
![Home-page](doc/screenshots/main-page.png) 
    * 
    *   
    * 

    
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

1. Within the project's [repository](), you select the **Settings** tab.
2. Then select the **Pages** menu tab on the left side.
3. Under **Source** then, select the **Main** branch from the drop-down menu and click **Save**.
4. A message will then pop up that the project has been successfully deployed with a live link.

You can visit the live link via this URL or on the top the README file- [STYLE-SHEET](https://leebri101.github.io/Chef-de-Party/)


## **Credits**
### **Honorable mentions**
3 years of many ups and downs on this coding journey, and from this i have a very love hate relationship coding in general but it was an enjoyable journey, from constant crashes of broken code, mental and physical burnout,  to the satisfaction of seeing the planning phase to the end product. Not to mention the difficult time of coding and also juggling a new role (which i have left recently) to focus on the task at hand.
Honestly it has been a great journey to go on I have learnt a lot over the years from being conscious about the look and functionality, to being a better developer of having the end user in mind. As this is only the beginning of my path to becoming a Front-end-web Developer , there will be many more great things to come so keep an eye out on [my github page](https://github.com/leebri101) for more to come. 
But alas this is my final project which i am very satisfied to say for the end results but due to time constraints and of sheer stress experienced in the previous IT role for the project, a "majority" of the project is finished at a satisfactory level, personally if there was more flexibility I would definitely enhance this further but i must give an shout-out to the following people. (Note there will be a few bugs here and there but it will be noted on TESTING.md file)

 * [John Lamontagne](https://github.com/john-lamontagne) my previous coding mentor who is amazing at giving me advice, tips & tricks for always improving my projects, not only on a curricular base level, but in a real life perspective too. I am sad that i will not be able to have a chat with you and showcase my final project due to you not being with the company anymore, but i honestly wish you all the best in your endeavors in what you do and hopefully we meet someday, and i personally want to thank you for you guidance. 

 * [Nathan Ouriach](https://github.com/nouriach) although we have had intermittent meetings due to clashes in both our schedules, I would like to first congratulate you on becoming a dad, and to thank for keeping me level heading and helping me along the way. Although it was a brief interaction, it has taught me a lot to stay focused on the bigger picture and to not be over ambitious in the project (or in future ones too!). 

 * The Learning People for the assistance and allowing me to partake in this great course (will definitely send people along the way shout out to the team/Theo Hall)


### **General reference:**
* The project theme was based around an an idea to mimic a copy of a famous fashion brand of [Uniqlo](https://www.uniqlo.com/uk/en/) and [END](https://www.endclothing.com/gb), both are notorious for their fashion pieces, to then make an E-commerce site of my own to give off the minimalistic but effective look to the site, a majority of the design ideas was taken from the respected companies as i personally liked how responsive and clean both site functioned.

* I have used [Medium](https://murthy-suhas.medium.com/building-a-demo-e-commerce-application-using-react-js-a39494a10e9b) for most of the understanding and structure of the project itself and to understand how to implement the API calling and placement to visually understand how to construct the project. As well as understanding and enhancing parts of the project through different components such as the shopping cart functionality ([Cart pt-1](https://medium.com/@ayabellazreg/make-a-simple-shopping-cart-app-using-react-redux-1-3-fefde93e80c7) [Cart pt-2](https://medium.com/@ayabellazreg/make-a-simple-shopping-cart-app-using-react-redux-part-2-88117cf1c069)).

* [Redux-toolkit](https://redux-toolkit.js.org/) for the basic reference guide on how to utilize redux functionality in the project. 

### **Content:**
* All icons that were used throughout the project are sourced from [Font-Awesome](https://fontawesome.com/)
* All fonts used have been imported from - [Google-Fonts](https://fonts.google.com/)
* All icons mainly used in the project were sourced from [Lucide](https://lucide.dev/)
* [Fake Store.API](https://fakestoreapi.com/) API usage for project

### **Media:**
* General usage of UI [Chakra-UI](https://v2.chakra-ui.com/)
* Pallette color scheme for visual design [Loopple](https://www.loopple.com/color-palette-generator#)
* For general color scheme for project [Palette Maker](https://palettemaker.com/app)
* Color picker site [Image Color Picker](https://imagecolorpicker.com/)
* General name searching for colors[Dopely Colors](https://colors.dopely.top/color-pedia/D9885E)
* For the basic and simple wire-frame design as a professional and practical project planning platform [Figma](https://www.figma.com/?fuid=).
* Quick mass image converter [JPG Converter](https://jpgconverter.com/jpg-to-png).
* Image compressor [CompressPNG](https://compresspng.com/). 
* Alternative image compressor [iloveimg](https://www.iloveimg.com/)
* Background 
Images/ images used in project [Unsplash](https://unsplash.com/photos/stainless-steel-cooking-pots-on-stove-0EkWTSFXwCc)

