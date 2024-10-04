const { sequelize } = require('../../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const { user_name, user_email, user_password, user_contact } = req.body;

    if (!user_name || !user_email || !user_password || !user_contact) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user_password, saltRounds);

    await sequelize.query(
      'CALL create_user(:user_name, :user_email, :user_password, :user_contact)',
      {
        replacements: {
          user_name,
          user_email,
          user_password: hashedPassword,
          user_contact,
        },
      }
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res
      .status(400)
      .json({ message: 'Error registering user', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    if (!user_email || !user_password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const [results] = await sequelize.query('CALL login_user(:user_email)', {
      replacements: { user_email },
      type: sequelize.QueryTypes.SELECT,
    });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(user_password, user.user_password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        name: user.user_name,
        email: user.user_email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res
      .status(400)
      .json({ message: 'Error logging in user', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_id, user_name, user_email, user_password, user_contact } =
      req.body;

    if (!user_id || !user_name || !user_email || !user_contact) {
      return res
        .status(400)
        .json({ message: 'All fields except password are required' });
    }

    let hashedPassword = null;
    if (user_password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(user_password, saltRounds);
    }

    await sequelize.query(
      'CALL update_user(:user_id, :user_name, :user_email, :user_password, :user_contact)',
      {
        replacements: {
          user_id,
          user_name,
          user_email,
          user_password: hashedPassword,
          user_contact,
        },
      }
    );

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res
      .status(400)
      .json({ message: 'Error updating user', error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;

    const [results] = await sequelize.query('CALL get_user_by_id(:user_id)', {
      replacements: { user_id },
      type: sequelize.QueryTypes.SELECT,
    });

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    res
      .status(400)
      .json({ message: 'Error retrieving user by ID', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    await sequelize.query('CALL delete_user(:user_id)', {
      replacements: { user_id },
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res
      .status(400)
      .json({ message: 'Error deleting user', error: error.message });
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('auth_token');
    res.status(200).json({ message: 'Logout successful' });
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getUserById,
  deleteUser,
  logoutUser,
};
