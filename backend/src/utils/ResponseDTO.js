class ResponseDto {
    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

const ResponseUtil = {
    success: (message = 'Successfully processed.', data = null) => {
        return new ResponseDto(true, message, data);
    },
    error: (message = 'An error occurred.', data = null) => {
        return new ResponseDto(false, message, data);
    }
};

module.exports = { ResponseUtil }; 