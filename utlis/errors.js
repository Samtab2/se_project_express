const REQUEST_SUCCESSFUL = 200;
const REQUEST_CREATED = 201;
const INVALID_DATA = {
    code: 400,
    text: {
        message: "The data is invalid"}
}
const NOT_FOUND = {
    code: 404,
    text: {
        message: "Not found"
    }
}
const SERVER_ERROR = {
    code: 500,
    text: {
        message: "Server error please try again later"
    }
}
    const CONFLICT = {
        code: 409,
        text: {
            message: "Duplicate key error"
        }
    }
        const UNAUTHORIZED = {
            code: 401,
            text: {
                message: "Unauthorized"
            }
}


module.exports = {
    REQUEST_SUCCESSFUL,
    REQUEST_CREATED,
    INVALID_DATA,
    NOT_FOUND,
    SERVER_ERROR,
    CONFLICT,
    UNAUTHORIZED
}