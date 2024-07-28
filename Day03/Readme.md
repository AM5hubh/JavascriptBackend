File Setup:-

    nodemon - keeps backend reloading while saving changes - npm i -D nodemon
        "dev": "nodemon src/index.js"
    touch app.js constants.js index.js
    mkdir controllers db middlewares models routes utils
    npm i -D prettier
        .prettierrc file
        .prettierignore


Database Connection:-
    
    Add port and monogodb compass uri to .env
    npm i dotenv mongoose express
    mongoose :- 
        Database Connection
        wrap in try catch to resolve problems
        async await is must
    
    