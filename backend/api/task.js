const moment = require("moment")

module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf("day").toDate();

        app.db("tasks")
            .where({ user_id: req.user.id })
            .where("estimate_at", "<=", date)
            .orderBy("estimate_at")
            .then(tasks => res.json(tasks))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.desc.trim()){
            return res.status(400).send("Description is a required field!");
        }

        req.body.user_id = req.user.id;

        app.db("tasks")
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => {
                res.status(400).json(err);
            });
    }

    const remove = (req, res) => {
        app.db("tasks")
            .where({ id: req.params.id, user_id: req.user.id })
            .del()
            .then(rowDeleted => {
                if (rowDeleted > 0){
                    res.status(204).send();
                }else{
                    const msg = `Task with id ${req.params.id} not founded!`;
                    res.status(400).send(msg);
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const updateTaskDoneAt = (req, res, done_at) => {
        app.db("tasks")
            .where({ id: req.params.id, user_id: req.user.id })
            .update({ done_at })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) => {
        app.db("tasks")
            .where({ id: req.params.id, user_id: req.user.id })
            .first()
            .then(task => {
                if (!task){
                    const msg = `Task with id ${req.params.id} not founded!`;
                    return res.status(400).send(msg);
                }
                const done_at = task.done_at ? null : new Date();
                updateTaskDoneAt(req, res, done_at);
            })
            .catch(err => res.status(400).json(err))
    }

    return { 
        getTasks, 
        save, 
        remove, 
        toggleTask
    }
}