$('form').on('submit', function (event) {
    event.preventDefault()
    if (validate()) {
        $.ajax({
            url: 'php/main.php',
            type: 'POST',
            cache: false,
            dataType: "json",
            data:
                "x_value=" + document.getElementById("xArgument").value +
                "&y_value=" + document.getElementById("yArgument").value +
                "&r_value=" + document.getElementById("rArgument").value,
        }).done(add_row)
            .fail(processError)
    }
})

function processError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}

function add_row(data) {
    let row = $('#historyTable');
    for (let i in data) {
        $('<td>').html(data[i]).appendTo(row);
    }
    $(row).insertAfter($('table tr:last').eq(0));
}

function validate(x, y, r) {
    if (x > -3 && x < 5 && y > -3 && y < 5 && r < 5 && r > 2) {
        return true
    } else {
        return false
    }
}


window.onload = function () {
    document.querySelector('.form').onchange = function () {
        let x = $('#xArgument').val()
        let y = $('#yArgument').val()
        let r = $('#rArgument').val()
        if (validate(x, y, r)) {
            let dots = document.getElementById('dot')
            if (dots == null) {
            } else {
                dots.remove()
            }
            let cr = +r;
            let xc = +x * (150 / cr) + 200;
            let yc = -(+y * (150 / cr)) + 200;
            const shoot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            shoot.setAttribute('r', '4')
            shoot.setAttribute('cx', String(xc))
            shoot.setAttribute('cy', String(yc))
            shoot.setAttribute('fill', 'black')
            shoot.setAttribute('color', 'black')
            shoot.setAttribute('id', 'dot')
            $('.graph').html(appendChild(shoot))
        } else {
            alert('Data isn\'t valid')
        }
    }
}
// function reset(){
//     while (!(document.getElementById('dot').is(':empty'))) {
//         let dots = document.getElementById('dot')
//         dots.remove()
//     }
// }

