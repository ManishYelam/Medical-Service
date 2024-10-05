const createPharmacyRoles = async () => {
    await Role.bulkCreate([
        {
            role_name: 'Pharmacist',
            description: 'Responsible for dispensing medications and ensuring compliance.',
            can_view_prescriptions: true,
            can_dispense_medications: true,
            can_manage_inventory: false,
            can_manage_finances: false,
            can_manage_users: false,
            can_audit: false,
        },
        {
            role_name: 'Pharmacy Technician',
            description: 'Assists pharmacists in preparing medications and managing stock.',
            can_view_prescriptions: true,
            can_dispense_medications: true,
            can_manage_inventory: true,
            can_manage_finances: false,
            can_manage_users: false,
            can_audit: false,
        },
        {
            role_name: 'Pharmacy Manager',
            description: 'Oversees the pharmacy operations.',
            can_view_prescriptions: true,
            can_dispense_medications: true,
            can_manage_inventory: true,
            can_manage_finances: true,
            can_manage_users: true,
            can_audit: false,
        },
        {
            role_name: 'Clinical Pharmacist',
            description: 'Provides advanced medication management services.',
            can_view_prescriptions: true,
            can_dispense_medications: true,
            can_manage_inventory: false,
            can_manage_finances: false,
            can_manage_users: false,
            can_audit: false,
        },
        {
            role_name: 'Medical Service Administrator',
            description: 'Handles the financial and administrative management.',
            can_view_prescriptions: false,
            can_dispense_medications: false,
            can_manage_inventory: true,
            can_manage_finances: true,
            can_manage_users: true,
            can_audit: false,
        },
        {
            role_name: 'Inventory Specialist',
            description: 'Responsible for managing inventory and supplies.',
            can_view_prescriptions: false,
            can_dispense_medications: false,
            can_manage_inventory: true,
            can_manage_finances: false,
            can_manage_users: false,
            can_audit: false,
        },
        {
            role_name: 'Auditor',
            description: 'Audits financial and compliance records.',
            can_view_prescriptions: true,
            can_dispense_medications: false,
            can_manage_inventory: false,
            can_manage_finances: true,
            can_manage_users: false,
            can_audit: true,
        },
    ]);
    console.log("Pharmacy roles created successfully.");
};

createPharmacyRoles();










const canViewPrescriptions = (user) => {
    return user.role.can_view_prescriptions;
};

if (canViewPrescriptions(currentUser)) {
    // Show prescriptions
} else {
    // Deny access
}
