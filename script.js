var PHONE_INPUT_VALIDATION_ERROR_MESSAGE = 'Please, type for you Phone only numbers from 0 to 9!';
var NAME_INPUT_VALIDATION_ERROR_MESSAGE = 'Please, type your name, it is required!';
var PHONE_PATTERN = new RegExp(/^[0-9]+$/);


jQuery(function($) {
    $(document).on('click', '.lightboxgallery-gallery-item', function(event) {
        event.preventDefault();
        $(this).lightboxgallery({
            showCounter: true,
            showTitle: true,
            showDescription: true
        });
    });
});

$(document).on('ready',init);
var emailInput, phoneInput, nameInput;


function init() {
    emailInput = $('#email');
    nameInput = $('#name');
    phoneInput = $('#phone');
    phoneInput.on('change', checkPhoneValidity);

    $('#regForm').submit(function (e) {
        var data = validateAndPrepareData();
        sendRequest(data);
        e.preventDefault();
    });
};


function validateAndPrepareData() {
    var phoneValue = phoneInput.val();
    if (!phoneValue || !phoneInput[0].validity.valid || !PHONE_PATTERN.test(phoneValue)) {
        alert(PHONE_INPUT_VALIDATION_ERROR_MESSAGE);
        return false;
    }

    var nameValue = nameInput.val();
    if (!nameValue || !nameInput[0].validity.valid) {
        alert(NAME_INPUT_VALIDATION_ERROR_MESSAGE);
        return false;
    }

    var emailValue = emailInput.val();

    return {
        Name: nameValue,
        Phone: phoneValue,
        Email: emailValue
    }
}

function checkPhoneValidity() {
    if (!phoneInput.val() || !PHONE_PATTERN.test(phoneInput.val()))
        setPhoneValidationMessage(PHONE_INPUT_VALIDATION_ERROR_MESSAGE);
    else
        setPhoneValidationMessage('');
}

function setPhoneValidationMessage(message) {
    message = message || '';
    phoneInput[0] && phoneInput[0].setCustomValidity ?
        phoneInput[0].setCustomValidity(message) : '';
}

function sendRequest(data) {
    if (!data) return; 
    $.ajax({
        type: 'post',    
        url: '/api/email',
        data: data,
        success: onSuccess,
        error: onError
    });
}


function resetForm() {
    phoneInput.val('');
    nameInput.val('');
    emailInput.val('');
}

function onSuccess() {
    location.href = "finish.html"
    resetForm();
}

function onError() {
    
    alert('An error has been happened when sending request to the server!');
}