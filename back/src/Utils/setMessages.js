
const setError = (error) => {
    return { status: 'error', error: error.message || error };
}

module.exports = {
    setError
}