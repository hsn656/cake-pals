const formatSuccessRespnse = (data, message= 'Success')=>{
    return {
        result: true,
        message,
        data
    };
}

const formatErrorRespnse = (message,errors= [])=>{
    return {
        result: false,
        message,
        errors,
        data: null
    };
}

module.exports = {
    formatSuccessRespnse,
    formatErrorRespnse
}