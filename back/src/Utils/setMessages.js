
const setError = (error) => {
    //console.error(error.errors[0].value);
    var message;
    if (error.name === 'SequelizeUniqueConstraintError') {
        var { value, path } = error.errors[0];
        message = { status: 'error', error: `${firstCharacterToUpper(path)}, ${value} already exists` };
        //console.log({...message});
    } else {
        message = { status: 'error', error: error.message || error };
    }
    return { ...message };
}


const sendMessage = (state, msg) => {
    return { status: state, msg }
}

const sendSuceess = (data) => {
    return { status: 'success', data }
}

function firstCharacterToUpper(string) {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
}

module.exports = {
    setError,
    sendMessage,
    sendSuceess,
    firstCharacterToUpper
}