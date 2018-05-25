const { Project } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const currentUser = req.session.user;

      const projects = await Project.findAll({
        where: {
          UserId: currentUser.id,
        },
      });
      return res.render('dashboard/index', {
        currentUser,
        projects,
      });
    } catch (err) {
      return next(err);
    }
  },
};
