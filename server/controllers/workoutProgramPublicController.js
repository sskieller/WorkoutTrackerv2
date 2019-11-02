const httpStatus = require('http-status-codes');

module.exports = {
    getPublicWorkoutProgram: (req,res,next) => {
        if (req) {
            console.log("NOT IMPLEMENTED");
        }
        res.json({
            success: false,
            error: "NOT IMPLEMENTED"
        });
    }
}