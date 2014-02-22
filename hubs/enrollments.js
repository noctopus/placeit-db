var mongoose = require('mongoose'),
    Class = mongoose.model('Class'),
    Schedule = mongoose.model('Schedule'),
    User = mongoose.model("User");

exports.enroll = function (socket) {
    return function (req, res) {
        if (req.session.user != null) {
            Class.find({
                id: req.body.id
            }, function (err, classes) {

                if (err) {
                    res.json({
                        message: err,
                        user: req.session.user,
                        class: _class,
                        code: 1
                    });
                } else {

                    var _class = classes[0];
                    for (var i = 0; i < _class.enrollment.length; i++) {
                        if (_class.enrollment[i].pid == req.session.user.pid) {
                            res.json({
                                message: err,
                                user: req.session.user,
                                class: _class,
                                code: 2
                            });
                            return;
                        }
                    }

                    var user = {
                        pid: req.session.user.pid,
                        major: req.session.user.major,
                        year: req.session.user.year
                    };
                    Class.update({
                        id: req.body.id
                    }, {
                        $push: {
                            enrollment: user
                        }
                    }, function (err, data) {
                        if (err) {
                            res.json({
                                message: err,
                                user: req.session.user,
                                class: _class,
                                code: 3
                            });
                        } else {
                            socket.emit("enrollment", {
                                id: req.body.id,
                                count: _class.enrollment.length + 1
                            });
                            res.json({
                                message: "Sent to everyone!",
                                user: req.session.user,
                                code: 200
                            });
                        }
                    });

                }

            });
        } else {
            res.json({
                message: "Unable to do action",
                user: req.session.user,
                class: _class,
                code: 500
            });
        }
    }
}


exports.drop = function (socket) {
    return function (req, res) {
        if (req.session.user != null) {
            Class.find({
                id: req.body.id
            }, function (err, classes) {

                if (err) {
                    res.json({
                        message: "Unable to do action",
                        user: req.session.user,
                        class: _class,
                        code: 1
                    });
                } else {
                    var _class = classes[0];
                    for (var i = 0; i < _class.enrollment.length; i++) {
                        if (_class.enrollment[i].pid == req.session.user.pid) {
                            _class.enrollment.splice(i, 1);


                    var user = {
                        pid: req.session.user.pid,
                        major: req.session.user.major,
                        year: req.session.user.year
                    };
                            Class.update({
                                id: req.body.id
                            }, {$pull : {enrollment : user}}, function (err, data) {
                                if (err) {
                                    res.json({
                                        message: "Unable to do action",
                                        user: req.session.user,
                                        class: _class,
                                        code: 2
                                    });
                                } else {
                                    socket.emit("enrollment", {
                                        id: req.body.id,
                                        count: _class.enrollment.length
                                    });
                                    res.json({
                                        message: "Sent to everyone!",
                                        user: req.session.user,
                                        code: 200
                                    });
                                }
                            });
                        }
                    }
                }

            });
        } else {
            res.json({
                message: "Unable to do action",
                user: req.session.user,
                class: _class,
                code: 3
            });
        }
    }
}