import * as fs from 'fs';
const CURR_DIR = process.cwd();

// This function creates a new project directory based off a template which contains all dependency files
const createDirectoryContents = (templatePath, newProjectPath) => {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach((file) => {
        const origFilePath = `${templatePath}/${file}`;
        const stats = fs.statSync(origFilePath);

        // If type is a file, read file contents
        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8');

            // Rename to .gitignore if .npmignore exists
            if (file === '.npmignore') file = '.gitignore';

            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

            // Recursively access all folders/files
            createDirectoryContents(
                `${templatePath}/${file}`,
                `${newProjectPath}/${file}`
            );
        }
    });
};

export default createDirectoryContents;
