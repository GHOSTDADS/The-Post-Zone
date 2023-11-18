function validation(values) {
    let error = {};
    const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if(values.username === "") {
        error.username = "Username field cannot be empty"
    }

    if(values.email === "") {
        error.email = "Email field cannot be empty"
    } else if(!emailregex.text(values.email)) {
        error.email = "Not a valid email!"
    } else {
        error.email = '';
    }

    if(values.password === "") {
        error.password = "password field cannot be empty"
    } else if(!passwordRegex.text(values.password)) {
        error.password = "Not a valid password!"
    } else {
        error.password = '';
    }

    return error;
};

export default validation;