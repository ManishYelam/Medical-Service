const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../../../models');

const createAdmin = async (req, res) => {
  try {
    const { admin_name, admin_email, admin_password, admin_phone } = req.body;

    if (!admin_name || !admin_email || !admin_password || !admin_phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(admin_password, saltRounds);

    await sequelize.query(
      'CALL create_admin(:admin_name, :admin_email, :admin_password, :admin_phone)',
      {
        replacements: {
          admin_name,
          admin_email,
          admin_password: hashedPassword,
          admin_phone,
        },
      }
    );
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res
      .status(400)
      .json({ message: 'Error registering admin', error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { input_email, admin_password } = req.body;

    if (!input_email || !admin_password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const [results] = await sequelize.query('CALL login_admin(:input_email)', {
      replacements: { input_email },
      type: sequelize.QueryTypes.SELECT,
    });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const admin = results[0];

    const isMatch = await bcrypt.compare(admin_password, admin.admin_password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        id: admin.admin_id,
        name: admin.admin_name,
        email: admin.admin_email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.cookie('auth_token', token, {
      httpOnly: true, // So it can only be accessed by the server
      maxAge: 1000 * 60 * 60, // 1-hour expiration
      secure: false, // Set to true for HTTPS
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res
      .status(400)
      .json({ message: 'Error logging in admin', error: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const {
      input_admin_id,
      admin_name,
      admin_email,
      admin_password,
      admin_phone,
    } = req.body;

    if (!input_admin_id || !admin_name || !admin_email || !admin_phone) {
      return res
        .status(400)
        .json({ message: 'All fields except password are required' });
    }

    let hashedPassword = null;
    if (admin_password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(admin_password, saltRounds);
    }

    await sequelize.query(
      'CALL update_admin(:input_admin_id, :admin_name, :admin_email, :admin_password, :admin_phone)',
      {
        replacements: {
          input_admin_id,
          admin_name,
          admin_email,
          admin_password: hashedPassword,
          admin_phone,
        },
      }
    );

    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error('Error updating admin:', error);
    res
      .status(400)
      .json({ message: 'Error updating admin', error: error.message });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { input_admin_id } = req.params;

    const [results] = await sequelize.query(
      'CALL get_admin_by_id(:input_admin_id)',
      {
        replacements: { input_admin_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (results.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    console.error('Error retrieving admin by ID:', error);
    res
      .status(400)
      .json({ message: 'Error retrieving admin by ID', error: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { input_admin_id } = req.params;

    await sequelize.query('CALL delete_admin(:input_admin_id)', {
      replacements: { input_admin_id },
    });

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res
      .status(400)
      .json({ message: 'Error deleting admin', error: error.message });
  }
};

const logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('auth_token');
    res.status(200).json({ message: 'Logout successful' });
  });
};

module.exports = {
  createAdmin,
  loginAdmin,
  updateAdmin,
  getAdminById,
  deleteAdmin,
  logoutAdmin,
};


