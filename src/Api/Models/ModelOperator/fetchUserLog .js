const { UserLogModel } = require("./DataModel");

const fetchUserLog = async () => {
    try {
        const userLog = await UserLogModel('MEDSRV718079');
        if (userLog) {
            const logs = await userLog.findAll({});
            console.log('Fetched User Logs:', logs);
        } else {
            console.log('UserLog is undefined.');
        }
    } catch (error) {
        console.error('Error fetching user logs:', error.message);
    }
};

fetchUserLog();
