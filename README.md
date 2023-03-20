# Quiz

This is a simple quiz game built using React and Vite. The project has been styled using Bootstrap to ensure that the game has a visually appealing interface. TypeScript has been used to reduce the likelihood of errors occurring within the codebase.

The API has been built using Express.js and MongoDB, with the addition of Mongoose to facilitate data manipulation. The API endpoints have been created to handle various CRUD (Create, Read, Update, Delete) operations for the questions.

## Installation

To run the project, please follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running the command `npm install`.
3. Start the API by running `npm run api`.
4. Start the client by running `npm run client`.

## Running the Project

To run the project, follow these steps:

1. Open a terminal window and run the following command: `npm run api`

2. Open another terminal window and run the following command: `npm run client`

Once both commands have been executed, your project should be up and running.

## API Endpoints

The following endpoints are available for data manipulation:

1. GET `/questions` – Returns one random question.
3. POST `/questions` – Adds a new question to the database.
3. PATCH `/questions/:id` – Updates an existing question.
4. DELETE `/questions/:id` – Delete an existing question.

## Contributing

If you would like to contribute to the project, please feel free to fork the repository and submit a pull request. Any contributions are greatly appreciated!

## License

This project is licensed under the MIT license. Please refer to the `LICENSE` file for more information.
