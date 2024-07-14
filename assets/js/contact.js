let lock = true;

$(".contact-form__submit").on("click", function(e) {
    e.preventDefault();
});

$(".contact-form__input-name").on("input", function() {
    let regex = /[^a-zA-Z]+/gi;

    inputValidate(regex, $(this), ".contact-form__invalid-name", true);
});


$(".contact-form__input-email").on("input", function() {
    let regex = /^(^[a-zA-Z]+[a-zA-Z0-9_]*)@([a-z]{3,20})\.([a-z]{2,15})$/g;

    inputValidate(regex, $(this), ".contact-form__invalid-email");
});


$(".contact-form__input-phone").on("input", function() {
    let regex = /^((\(\+[0-9]{2,4}\))|(\+[0-9]{2,4}))?[0-9]{7,30}$/g;

    inputValidate(regex, $(this), ".contact-form__invalid-phone");
});


$(".contact-form__input-age").on("input", function() {
    changeAlertState(".contact-form__invalid-age", false);
    let age = Number($(this).val());

    if($(this).val() == "") {
        lock = lock || true;
        changeAlertState(".contact-form__invalid-age");
        checkLock()
        return;
    }

    if(age < 18 || age > 100) {
        lock = lock || true;
        changeAlertState(".contact-form__invalid-age");
        checkLock()
        return;
    }

    lock = lock && false;
    changeAlertState(".contact-form__invalid-age", false);
    checkLock()
});


$(".contact-form__input-password").on("input", function() {
    let regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$/g;

    inputValidate(regex, $(this), ".contact-form__invalid-password");
});


$(".contact-form__input-repassword").on("input", function() {
    changeAlertState(".contact-form__invalid-repassword", false);
    let password = $(".contact-form__input-password").val();

    if(password == "" || $(this).val() == "") {
        lock = lock || true;
        changeAlertState(".contact-form__invalid-repassword");
        checkLock()
        return;
    }

    if($(this).val() != password) {
        lock = lock || true;
        changeAlertState(".contact-form__invalid-repassword");
        checkLock()
        return;
    }

    lock = lock && false;
    changeAlertState(".contact-form__invalid-repassword", false);
    checkLock();
});


function inputValidate(regex, element, alertName, opposite=false) {
    changeAlertState(alertName, false);
    if($(element).val() == "") {
        lock = lock || true;
        changeAlertState(alertName);
        checkLock()
        return;
    }

    if(regexChecker(regex, element, opposite)) {
        changeAlertState(alertName);
        checkLock()
        return;
    }
    
    lock = lock && false;
    changeAlertState(alertName, false);
}

function regexChecker(regex, element, opposite=false) {
    if(opposite) {
        if(regex.test($(element).val())) {
            lock = lock || true;
            return true;
        }
    }
    else {
        if(regex.test($(element).val()) == false) {
            lock = lock || true;
            return true;
        }
    }
    return false;
}

function changeAlertState(alertName, state=true) {
    if(state) {
        $(alertName).removeClass("hidden");
    }
    else {
        $(alertName).addClass("hidden");
    }
}

function checkLock() {
    $(".contact-form__input-field").each(function() {
        if($(this).val() == "" || $(this).next().hasClass("hidden") == false)
            lock = lock || true;
            submitButtonState();
    })
}

function submitButtonState() {
    if(lock) {
        $(".contact-form__submit").attr("disabled", "true");
    }
    else {
        $(".contact-form__submit").removeAttr("disabled");
    }
}