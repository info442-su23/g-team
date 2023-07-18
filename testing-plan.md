# Types of Testing 
For our testing plan, our team will focus on acceptance testing for our ‘Get Home Safe’ application. Our application relies on user needs and experience, and it is crucial that our users can work with our product effectively. With acceptance testing, we aim to learn which parts of the application are easy to use and which need better functionality. For example one of our biggest features of ‘Get Home Safe’ is posting a forum to the ‘Community Forum’ channel. This feature must be seamlessly integrated, have no errors of typing in textboxes, and is able to be posted by an authorized user. Acceptance testing will allow us to figure out user needs quickly, and will help us to create an application to make UW students feel safer in U District.

# Testing Process
The environments that our team will be using will be GitHub, Firebase, jQuery, and React.js. We will be pushing our files to the Team G repository on GitHub for all of us to pull and edit on our own. Firebase will be the environment that we will be using to deploy our applications and the place where we will store user data and information. Finally, jQuery will be used for the front-end tasks and React.js will be used for the back-end. 

**First Sprint (July 18 - July 26)**

In the first sprint, our two developers will focus on implementing the UI interface of the application and more of the front-end responsibilities. These include: creating the navigation bar at the top of the application for all pages, basic functionality like clicking on different pages, etc. 
- During the first five days (July 18th - July 23rd), the developers will focus solely on deploying code to the Team G GitHub repository before having to examine deep errors or testing. This timeline will include the basics and a draft of the final application to ensure a solid foundation is implemented. Developers may test simple functionalities in this process. For example, a developer may check to see if their code correctly places the ‘Get Home Safe’ logo on the left-hand corner of the application. 
- After incorporating the basics of the application, the last days of the sprint (July 24th - July 26th) will be dedicated to acceptance testing. Based on the acceptance testing criteria, the product manager (PM) and product designer (PD) will test the application to ensure the application is working properly. Within this process, the PM and PD will communicate any errors or concerns with the developers. Small errors of the UI interface and basic functionality will be completed at this stage.

**Second Sprint (July 27 - Aug 7)**

In the second sprint, the two developers will focus more on the back-end development of the application. Using open-source tools to code the back-end tasks, the developers will implement the interactive pieces within this phase. This sprint will be a bit more difficult to debug and may take more time than the first sprint. 
- Instead of having some days of this sprint dedicated to just coding and deploying and the others to testing, our group will test simultaneously with deploying. Debugging and testing is more efficient when it is done during deployment as it would take much longer for our team to find errors after the developers are all done coding. 
- As it was mentioned in the first sprint, the product manager and product designer will assist the developers by conducting acceptance testing throughout the process. We aim to catch errors quickly especially for more interactive features including interactive likes of a post that increase if you click on the ‘heart’ button or creating a post that will appear on the ‘Community Forum’ page. 
- Within this stage, the most important interactive features will be implemented and working properly.

Although developers will do the bulk of coding the application, the other members of the project will help out as well if needed. 

# Testing Environment
For the testing of our 'Get Home Safe' application, we will be conducting the tests in the deployed version of the application using Firebase. The code that will be tested is stored in the Team G GitHub repository. Our acceptance testers will be using different web browsers and devices to ensure that the application functions properly across various platforms. Instead of testing the application solely on individual developer computers, we will be testing it in the actual production environment to simulate real-world usage scenarios and uncover any potential issues that may arise. This approach allows us to thoroughly assess the application's performance and user experience under realistic conditions, ensuring that it meets the needs of our users effectively.

# Defect Management 

For the 'Get Home Safe' application, defects found during testing will be tracked, triaged, and fixed using a designated bug tracking system. Testers will report any discovered bugs through this system, providing a clear description of the issue, steps to reproduce it, and any supporting materials. The triage team, consisting of members from development, testing, and project management, will assess the bugs' impact and severity, prioritizing them accordingly. Assigned developers will take ownership of the bugs, analyze their root causes, and develop solutions to address them. The bug tracking system will be used to assign, monitor, and communicate the progress of bug fixes, ensuring that they are resolved within the allocated time frame. Effective communication and collaboration between testers and developers will play a crucial role in efficiently resolving the identified defects.

# User Acceptance Testing Scripts 

## Sign-In Page (UW Authentication) Feature
**Context: Sign-In Page Elements**
- Interact with two text fields: one for entering a login name and one for entering a password (Requirement B1) 
- And the user should see a Sign-In button (Requirement B5)
- And the user should see a "Forgot Password" button (Requirement B3)
- And the user should see side buttons with links to information about learning about UW NetIDs and getting help (Requirement B6)
- Once user authenticates themselves, expect to see the homepage (the ‘Community Forum Page’) (Requirement B4).

## Settings Feature**
**Context: User is logged in**
- Click on profile picture icon, expect to change a picture by uploading from computer (Requirement C2).
- Click on dropdown menu for gender, major, and year. Expect a range of choices for each selection (Requirement C3).
- Click on enable or disable for 'Get Home Safe' notifications. Expect notifications of 'walking buddies' requests if enabled (Requirement C4).
- Click on 'save' button, expect changes to appear for the user (Requirement C5). 

**Context: User Fails to Log-In**
- Clicks on sign-in button but fails to input the correct UW NetID and password. Expect to see an error message above the UW NetID input, prompting the user to sign-in again (Requirement B2).

## Homepage Feature
**Context: User is logged in**
- Expect to see the 10 newest posts to appear on the community forum page with the poster’s account name and title of the suspicious activity (Requirement D6 & Requirement D5).
- Interact with each post either by liking, viewing, commenting, or sharing the post (Requirement D9). 
- Expect user’s profile picture and their friends list on the left-hand side of the application (Requirement D4)
- Click on ‘Create a Post’ button to submit a forum to the page (Requirement D3).

**Context: User is not logged in**
- Expect to be redirected to the sign-in page until the user is authenticated (Requirement D1)

## Creating a Post Feature
**Context: User successfully posts**
- Expect to see a window with a title and description textbox (Requirement E2)
- Click on the ‘title’ textbox and expect to input characters (Requirement E2)
- Click on the ‘description’ textbox and expect to input characters (Requirement E2) 
- After interacting with the ‘title’ and ‘description’, click on the ‘post’ button to upload post to the ‘Community Forum’ (Requirement E3)
- Expect to cancel posting by clicking on the ‘X’ button (Requirement E5).

**Context: User fails to post**
- Expect to see an error message appear, prompting users to input in the ‘title’ textbox and ‘description’ textbox until they are filled out (Requirement E4). 

## Viewing a Post Feature
**Context: Post is still available**
- Expect to see the context of the post, the author, likes/reaction icon, and comment section (Requirement G1a - G1d)
- Click on the like post, expect to see the heart icon change color to red and the number of total likes increase (Requirement G2)
- Click the option to leave a comment and click ‘submit’, expect the comment to appear under the post (Requirement G3).

**Context: Post has been deleted by the author**
- Expect that the user cannot view the post (Requirement F1a)
- Expect an error message indicating that the post has been deleted or not found (Requirement F1b)
- Expect a back button for users to return to the home page (Requirement F1c)

## Friends List Feature
**Context: User is logged in**
- Expect a list of friends displayed that the user has added on the page (Requirement H1)
- Click on the ‘search bar’, expect users to search for friends by username or given name (Requirement H2)
- Expect a suggestion tab to add mutual friends (Requirement H4)
- Click on the block tab to view people the user has blocked. Click on the ‘block’ button on a friend, expect that friend no longer appears on the friend’s list (Requirement H5 & H6).
- Click on the unblock tab, expect the blocked friend to no longer be blocked (H6)
- Click on the unadd button, expect the friend to longer be a friend to the user (H7)

**Context: User is not logged in** 
- Expect to be redirected to the sign-in page until the user is authenticated (Requirement D1)

## Direct Message Page
**Context: Message Form and Sending Messages**
- Click on the writing icon, expect to select friends' name(s) from dropdown list. Expect to see a message form with an empty textbox to input a message. Click on 'send' to send the message to the selected friend (Requirement I1 & Requirement I7).
- Expect list of online friends (Requirement I2).
- Expect panel of recent messages (Requirement I3).
- Scroll up and down, expect conversation history with each messaged friend (Requirement I4).
- Expect each message to have the friend's name and profile picture at the top bar (Requirement I5).

**Context: Sending Message to Blocked/Unfriended User**
- Click on 'send' message button, expect red exclamation mark icon next to message (Requirement I7).


## Get Home Safe Feature Page
**Context: Successful Post** 
- Click on 'request a walking buddy' button, expect a pop-up to input information (Requirement J3).
- Input location and number of walking buddies needed, click on the 'request button' and expect request to be posted (Requirement J4 - J6).
- Expect successful post to appear on the 'Buddy Requests' section for users to interact with (Requirement I8).
 
**Context: Unsuccessful Post**
- Expect an error message if all inputs are not completed correctly, prompting user to input information again (Requirement J7). 



  

