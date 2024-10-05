// logAccess.js
const logAccessAttempt = (actionDescription) => {
    return (req, res, next) => {
        const { user } = req;
        const isAllowed = res.statusCode < 400; // Status < 400 means success

        console.log(`${isAllowed ? 'ALLOWED' : 'DENIED'}: ${user?.username || 'Unknown user'} tried to ${actionDescription} at ${new Date().toISOString()}`);
        
        next();
    };
};

module.exports = logAccessAttempt;
