class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// 4xx Error Codes
exports.BadRequestError = (message = 'Bad request') =>{
    return new CustomError(message, 400);
  };
  
exports.UnauthorizedError = (message = 'User is unathorized') =>{
    return new CustomError(message, 401);
  };
  
exports.ForbiddenError = (message = 'Requested resource is forbidden') =>{
    return new CustomError(message, 403);
  };
  
exports.NotFoundError = (message = 'Not found') =>{
    return new CustomError(message, 404);
  };
  
exports.MethodNotAllowedError = (message = 'Request method not allowed') =>{
    return new CustomError(message, 405);
  };
  
exports.ConflictError = (message = 'Conflict with request occured') =>{
    return new CustomError(message, 409);
  };
  
exports.ValidationError = (message = 'Request contains validation errors') =>{
    return new CustomError(message, 422);
  };
  
// 5xx Error Codes
exports.InternalServerError = (message = 'Internal server error') =>{
    return new CustomError(message, 500);
  };


  