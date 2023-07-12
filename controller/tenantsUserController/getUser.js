const CompanyEmployee = require('../../models/TenantUser')
const {createUserSchema} = require('../../validations/tenantUser')

const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await CompanyEmployee.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  module.exports=getUserById;