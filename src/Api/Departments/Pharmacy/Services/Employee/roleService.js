// services/roleService.js
const Role = require('../models/Role');

const roleService = {
    createRole: async (data) => {
        try {
            const role = await Role.create(data);
            return role;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getRoles: async () => {
        try {
            const roles = await Role.findAll();
            return roles;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getRoleById: async (id) => {
        try {
            const role = await Role.findByPk(id);
            if (!role) throw new Error("Role not found");
            return role;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    updateRole: async (id, data) => {
        try {
            const role = await Role.findByPk(id);
            if (!role) throw new Error("Role not found");
            await role.update(data);
            return role;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deleteRole: async (id) => {
        try {
            const role = await Role.findByPk(id);
            if (!role) throw new Error("Role not found");
            await role.destroy();
            return { message: "Role deleted successfully" };
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

module.exports = roleService;
