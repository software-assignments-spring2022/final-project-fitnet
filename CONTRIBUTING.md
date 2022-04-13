# Guide to Contributing

## Team Norms 

Please make sure that you are following our [team norms](./team-norms.md) before making any contributions. 

## Rules of contributing 
These are the same rules listed in our [coding standards](./team-norms.md).  
- Don't over-engineer. Write minimum code to get things working end to end, only then iterate to improve. 
- Always push working code, if you break the pipeline/build then fix it.
- Make granular and small commits, per feature or per bug fix.
- Provide descriptive commit messages.
- Write self documenting code. Use descriptive variable and function names. Avoid unnecessary name shortening.
- Don't leave dead/commented out code behind. If you see such code, delete it.
- Write automated tests to cover critical integration points and functionality.

## Setting up local development 
To create a copy of this project repository on your own local machine: 
1. Go into the directory that you would like the project folder to be in: `cd <directory-name>`
1. Clone the project repository: `git clone <url>` 
1. Go into your local copy of our project repository: `cd final-project-fitnet` 

Instructions for working on the project are below in the Git workflow section. 

## Git workflow 
To work on this project from your own local machine: 
1. Create a new branch: `git checkout -b <branch-name>` 
1. Work on the project on your new branch. 
1. Commit your changes: 
    ``` 
    git status 
    git add <changed-files> 
    git commit -m “<a descriptive message about the changes you made>"
    ```
1. Push your new branch to the remote repository: `git push origin <branch-name>`
1. Make a pull request to merge your new branch with origin/main. Please leave a polite message detailing your changes. 
1. If new changes have been merged, bring your local repository up to date in the main branch: 
    ``` 
    git checkout master
    git pull 
    ```

## Building and testing 
To test this project: 
1. Clone the project repository: `git clone <url` 
2. Go into the front end directory: `cd final-project-fitnet/front-end` 
3. Run `npm install` 
4. Run `npm start` 

The app should start in your default web browser. 
