
const setError = (error) => {
    console.error(error);
    return { status: 'error', error: error.message || error };
}

const sendMessage = (state, msg) => {
    return { status: state, msg }
}

const sendSuceess = (data) => {
    return { status: 'success', data }
}

module.exports = {
    setError,
    sendMessage,
    sendSuceess
}