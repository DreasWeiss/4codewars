# 4codewars

A tool for organizing and managing solutions to Codewars katas. This project helps in maintaining a structured repository of your completed katas, updating Markdown tables with new solutions, and providing easy access to kata information and solutions.

## Features

- Automatically updates README and kyu-specific Markdown files with new kata information.
- Inserts new rows into Markdown tables, maintaining a consistent structure.
- Handles file reading and writing operations with error handling.
- Provides easy navigation to kata solutions and their respective directories.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/DreasWeiss/4codewars.git
    ```

2. Navigate to the project directory:

    ```sh
    cd 4codewars
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

## Usage

### Adding a New Kata

1. Prepare the kata information in the following format:

    ```javascript
    const kataInfo = {
      title: "Kata Title",
      kyu: "6",
      text: "Description of the kata",
      kataJS: "kata.js",
      url: "https://www.codewars.com/kata/xxxxxx",
      titleCamelCase: "KataTitle"
    };
    ```

2. Call the `updateTable` function with the kata information:

    ```javascript
    const updateTable = require('./updateTable');
    updateTable(kataInfo);
    ```

3. This will automatically update the `README.md` and the corresponding `kyu` Markdown file with the new kata information.

## File Structure

### codewars directory:

- file: 1kyu.md
- file: 2kyu.md
- file: 3kyu.md
- file: 4kyu.md
- file: 5kyu.md
- file: 6kyu.md
- file: 7kyu.md
- file: 8kyu.md
- file: README.md
- file: beta.md
- dir: katas


#### katas directory:

- dir: kataNameCamelCase


##### kataNameCamelCase directory:

- kata.js
- README.md


- `addNewRowInMdTable.js`: Contains the function to add a new row in a Markdown table.
- `updateTable.js`: Contains the function to update the Markdown tables with new kata information.
- `README.md`: Main readme file for the project, updated with new kata information.
- `katas/`: Directory containing subdirectories for each kata, named in camel case.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes.
4. Commit your changes: `git commit -m 'Add some feature'`.
5. Push to the branch: `git push origin feature/your-feature-name`.
6. Open a pull request.

## License

This project is licensed under the MIT License.