let dollar = jQuery.noConflict();

let count_rows = (sessionStorage.length/6);

let nameTag = ['X', 'Y', 'R', 'CT', 'ET', 'Re'];

dollar('form').on('submit', function (event) {
    event.preventDefault()
    let x = dollar('#xArgument').val();
    let y = dollar('#yArgument').val();
    let r = dollar('#rArgument').val();
    if (validate(x, y, r)) {
        shoot(x, y, r);
        dollar.ajax({
            url: 'php/main.php',
            type: 'POST',
            cache: false,
            data:
                "x_value=" + document.getElementById("xArgument").value +
                "&y_value=" + document.getElementById("yArgument").value +
                "&r_value=" + document.getElementById("rArgument").value,
        }).done(add_row)
            .fail(processError)
    } else {
        let errorRow  = document.getElementById('error');
        errorRow.innerHTML = "Data not valid";
    }
})

function processError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}

function add_row(data) {
    let countTag = 0;
    count_rows = count_rows + 1;
    cleanError();
    let start_row = dollar('startTable');
    let real_row = dollar('tr');
    for (let i in data){
        let info = document.createElement('td');
        info.innerHTML = data[i];
        real_row.appendChild(info);
        let tag = nameTag[countTag] + count_rows;
        add_storage(tag, data[i]);
        countTag = countTag + 1;
    }
    start_row.after(real_row);
}

function add_storage(key, data){
    sessionStorage.setItem(key, data);
}

function validate(x, y, r) {
    return +x > -3 && +x < 5 && +y > -3 && +y < 3 && +r < 5 && +r > 2;
}


function shoot(x, y, r) {
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
        shoot.setAttribute('r', '4');
        shoot.setAttribute('cx', String(xc));
        shoot.setAttribute('cy', String(yc));
        shoot.setAttribute('fill', 'black');
        shoot.setAttribute('color', 'black');
        shoot.setAttribute('id', 'dot');
        let pole = document.getElementById('graph');
        pole.appendChild(shoot);
    } else {
        alert('okey')
    }
}

function cleanError(){
    let errorRow = document.getElementById('error');
    errorRow.innerHTML = '';
}

window.onload = function() {
    let ssLen = sessionStorage.length/6;
    let countss = 1;
    let start_row = document.getElementById('startTable');
    while(ssLen + 1 > countss){
        let real_row = document.createElement('tr');
        for(let j in nameTag){
            let key = nameTag[j] + countss;
            let info = document.createElement('td');
            info.innerHTML = sessionStorage.getItem(key);
            real_row.appendChild(info);
        }
        start_row.after(real_row)
        countss = countss + 1;
    }
}
