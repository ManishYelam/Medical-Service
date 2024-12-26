const { departmentMapping } = require('./Data');

const getInstanceByKey = (health_id) => {
  const prefix = health_id.slice(0, 6).toUpperCase();
  return departmentMapping[prefix];
};

// console.log(getDatabaseInstanceByKey('PARTNR437293'));

module.exports = { getInstanceByKey };
