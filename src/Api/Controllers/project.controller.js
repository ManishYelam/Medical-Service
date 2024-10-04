const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const { sequelize } = require('../models');

const createProject = async (req, res) => {
  try {
    const { project_name, project_description, start_date, end_date, status } =
      req.body;

    if (!project_name || !project_description || !start_date || !status) {
      return res
        .status(400)
        .json({ message: 'All fields except end_date are required' });
    }

    await sequelize.query(
      'CALL create_project(:project_name, :project_description, :start_date, :end_date, :status)',
      {
        replacements: {
          project_name,
          project_description,
          start_date,
          end_date: end_date || null,
          status,
        },
      }
    );
    res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    console.error('Error creating project:', error);
    res
      .status(400)
      .json({ message: 'Error creating project', error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const {
      project_id,
      project_name,
      project_description,
      start_date,
      end_date,
      status,
    } = req.body;

    if (
      !project_id ||
      !project_name ||
      !project_description ||
      !start_date ||
      !status
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await sequelize.query(
      'CALL update_project(:project_id, :project_name, :project_description, :start_date, :end_date, :status)',
      {
        replacements: {
          project_id,
          project_name,
          project_description,
          start_date,
          end_date,
          status,
        },
      }
    );
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    res
      .status(400)
      .json({ message: 'Error updating project', error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { project_id } = req.params;

    const [results] = await sequelize.query(
      'CALL get_project_by_id(:project_id)',
      {
        replacements: { project_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (results.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    console.error('Error retrieving project by ID:', error);
    res
      .status(400)
      .json({
        message: 'Error retrieving project by ID',
        error: error.message,
      });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const [results] = await sequelize.query('CALL get_all_projects()', {
      type: sequelize.QueryTypes.SELECT,
    });

    if (results.length === 0) {
      return res.status(404).json({ message: 'No projects found' });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res
      .status(400)
      .json({ message: 'Error retrieving projects', error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { project_id } = req.params;

    await sequelize.query('CALL delete_project(:project_id)', {
      replacements: { project_id },
    });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res
      .status(400)
      .json({ message: 'Error deleting project', error: error.message });
  }
};

const generateProject = async (req, res) => {
  try {
    const { project_name } = req.body;

    // Validate input
    if (!project_name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    // Step 1: Create a folder to hold the project files
    const projectDir = path.join(
      __dirname,
      `../generated_projects/${project_name}`
    );

    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    // Step 2: Create basic React project structure
    const reactFiles = {
      'public/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project_name}</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>`,
      'src/index.js': `import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);`,
      'src/App.js': `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to ${project_name}</h1>
      </header>
    </div>
  );
}

export default App;`,
      'src/App.css': `body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
  text-align: center;
}`,
      'src/index.css': `body {
  margin: 0;
  font-family: Arial, sans-serif;
}`,
    };

    // Write the React files to the directory
    for (const [filePath, content] of Object.entries(reactFiles)) {
      fs.writeFileSync(path.join(projectDir, filePath), content);
    }

    // Step 3: Create a basic package.json file
    const packageJsonContent = {
      name: project_name,
      version: '1.0.0',
      private: true,
      dependencies: {
        react: '^18.0.0',
        'react-dom': '^18.0.0',
      },
      scripts: {
        start: 'react-scripts start',
        build: 'react-scripts build',
        test: 'react-scripts test',
        eject: 'react-scripts eject',
      },
      eslintConfig: {
        extends: ['react-app', 'react-app/jest'],
      },
      browserslist: {
        production: ['>0.2%', 'not dead', 'not op_mini all'],
        development: [
          'last 1 chrome version',
          'last 1 firefox version',
          'last 1 safari version',
        ],
      },
    };

    fs.writeFileSync(
      path.join(projectDir, 'package.json'),
      JSON.stringify(packageJsonContent, null, 2)
    );

    // Step 4: Zip the folder and send the zip file as a response
    const output = fs.createWriteStream(`${projectDir}.zip`);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Compression level
    });

    output.on('close', () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log(
        'archiver has been finalized and the output file descriptor has closed.'
      );

      // Step 5: Download the zip file
      res.download(`${projectDir}.zip`);
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    // Add the folder contents to the archive
    archive.directory(projectDir, false);

    await archive.finalize();
  } catch (error) {
    console.error('Error generating React project:', error);
    res
      .status(500)
      .json({
        message: 'Error generating React project',
        error: error.message,
      });
  }
};

module.exports = {
  createProject,
  updateProject,
  getProjectById,
  getAllProjects,
  deleteProject,
  generateProject,
};
