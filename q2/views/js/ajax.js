$(() => {
    let question = $('#question');
    $('#form').submit(() => {
        $.get('/8ball', {
            data: question.val()
        }).done((res) => {
            question.val(res);
            question.focus(function () {
                this.select();
            });
        }).fail(() => {
            $('#error').text("Unable to reach server");
        });
        return false;
    });

});