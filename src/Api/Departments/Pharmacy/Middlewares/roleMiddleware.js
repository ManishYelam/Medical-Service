// roleMiddleware.js
const canViewPrescriptions = (req, res, next) => {
    const { user } = req; // Assuming user is set on the request object (e.g., from authentication middleware)

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized: No user logged in' });
    }

    if (user.role && user.role.can_view_prescriptions) {
        // User has permission to view prescriptions
        next(); // Proceed to the next middleware or controller function
    } else {
        // User does not have permission
        return res.status(403).json({ message: 'Forbidden: You do not have permission to view prescriptions' });
    }
};

module.exports = canViewPrescriptions;
