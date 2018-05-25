const { Project, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const project = await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('success', 'Categoria criada com sucesso');
      return res.redirect(`/app/projects/${project.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);
      const sections = await Section.findAll({
        where: {
          ProjectId: id,
        },
      });

      return res.render('projects/show', {
        activeProject: project,
        project,
        sections,
        currentUser: req.session.user,
      });
    } catch (err) {
      return next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      await Project.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Projeto deletado com sucesso');
      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },
};
