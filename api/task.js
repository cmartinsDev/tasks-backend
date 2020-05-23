const moment = require('moment')

module.exports = app => {
  const getTasks = (req, res) => {
    const date = req.query.date ? req.query.date : moment().endOf('day').toDate()

    console.log(`date: ${date}`)
    app.database('tasks').where({ userId: req.user.id })
                         .where('estimateAt', '<=', date)
                         .orderBy('estimateAt')
                         .then(tasks => res.json(tasks))
                         .catch(err => res.status(400).json(err))
  }

  const save = (req, res) => {
    if (!req.body.desc.trim()) {
      return res.status(400).send('Descrição é um campo obrigatório')
    }

    req.body.userId = req.user.id

    app.database('tasks').insert(req.body)
                         .then(_ => res.status(204).send())
                         .catch(err => res.status(400).json(err))
  }

  const remove = (req, res) => {
    app.database('tasks').where({ id: req.params.id, userId: req.user.id })
                        .del()
                        .then(rowsDeleted => {
                          if (rowsDeleted > 0) res.status(204).send()
                          if (rowsDeleted = 0) res.status(400).send(`Não foi encontrado task com id ${req.params.id}.`)
                        })
                        .catch(err => res.status(400).json(err))
  }

  const updateTaskDoneAt = (req, res, doneAt) => {
    app.database('tasks').where({ id: req.params.id, userId: req.user.id })
                          .update({ doneAt })
                          .then(_ => res.status(204).send())
                          .catch(err => res.status(400).json(err))
  }

  const toggleTask = (req, res) => {
    app.database('tasks')
      .where({ id: req.params.id, userId: req.user.id })
      .first()
      .then(task => {
        if (!task) {
          return res.status(400).send(`Task com id ${req.params.id} não encontrada.`)
        }
        const doneAt = task.doneAt ? null : new Date()
        updateTaskDoneAt(req, res, doneAt)

      })
      .catch(err => res.status(400).json(err))
  }

  return { getTasks, save, remove, toggleTask }

}