$(() => {
    $('.add-to-cart').submit(function () {
        let data = {
            name: this.name.value,
            price: this.price.value
        };

        $.post({
            url: '/addToCart',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8"
        }).done((res) => {
            $('.message').text('Product added to the cart');
            $('#productCount').text(res.result);
        }).fail(() => {
            $('.message').text("Unable to reach server");
        });

        return false;
    });
});