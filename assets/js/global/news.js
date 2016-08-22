/* ========================================================
                       datePicker
======================================================== */
var dateFrom = $('.date-from'),
    dateTo = $('.date-to'),
    successBtn = $('.sort-btn');

var dateFormat = 'dd.MM.yyyy';
var dateNow = new Date();
var dateFromMask = dateFrom.val($.format.date(dateNow, dateFormat));
var dateToMask = dateTo.val($.format.date(dateNow, dateFormat));

var dateFromDefault = dateFrom.val();
var dateToDefault = dateTo.val();


dateFrom.datepicker({format: 'dd.mm.yyyy'});
dateTo.datepicker({format: 'dd.mm.yyyy'});

dateFrom.on('changeDate', function () {
    var dateFromVal = $(this).val();
    var dateToVal = $(dateTo).val();

    var dateFromSlpit = dateFromVal.split(".");
    var dateToSlpit = dateToVal.split(".");

    var dateFromConvertToDate = new Date(dateFromSlpit[2], dateFromSlpit[1] - 1, dateFromSlpit[0]);
    var dateToConvertToDate = new Date(dateToSlpit[2], dateToSlpit[1] - 1, dateToSlpit[0]);

    var dateFromChanged = dateFromConvertToDate.getTime();
    var dateToChanged = dateToConvertToDate.getTime();

    showBtn(dateFromChanged, dateToChanged);

});

dateTo.on('changeDate', function () {
    var dateFromVal = $(dateFrom).val();
    var dateToVal = $(this).val();

    var dateFromSlpit = dateFromVal.split(".");
    var dateToSlpit = dateToVal.split(".");

    var dateFromConvertToDate = new Date(dateFromSlpit[2], dateFromSlpit[1] - 1, dateFromSlpit[0]);
    var dateToConvertToDate = new Date(dateToSlpit[2], dateToSlpit[1] - 1, dateToSlpit[0]);

    var dateFromChanged = dateFromConvertToDate.getTime();
    var dateToChanged = dateToConvertToDate.getTime();


    showBtn(dateFromChanged, dateToChanged);
});

function showBtn(dateOne, dateTwo) {
    if (dateOne > dateTwo) {
        successBtn.css('display', 'none');
    } else {
        successBtn.css('display', 'inline-block');
    }
}

