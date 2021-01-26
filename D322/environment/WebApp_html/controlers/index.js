window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    totalOperacionais();
    totalVoluntarios();
    ocorrenciasAtivas();
    users();
}

function totalOperacionais() {
    let totalOperacionais = document.getElementById("totalOperacionais");
    try {
        fetch(`http://127.0.0.1:8080/operationals`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then(function (data) {
                totalOperacionais.innerHTML = data.length;
            })
    } catch (err) {
        alert(err);
    }
}

function totalVoluntarios() {
    let totalvoluntarios = document.getElementById("totalvoluntarios");
    try {
        fetch(`http://127.0.0.1:8080/operationals/posto/101`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then(function (data) {
                totalvoluntarios.innerHTML = data.length;
            })
    } catch (err) {
        alert(err);
    }
}

function ocorrenciasAtivas() {
    let ocorrenciasAtivas = document.getElementById("ocorrenciasAtivas");
    try {
        fetch(`http://127.0.0.1:8080/events/estado/1`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then(function (data) {
                ocorrenciasAtivas.innerHTML = data.length;
            })
    } catch (err) {
        alert(err);
    }
}

function users() {
    fetch("http://127.0.0.1:8080/users", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
    })
        .then(res => res.json())
        .then((out) => {
            $("#tabelaUsers tbody").empty();
            $.each(out, function (index, value) {
                $("#tabelaUsers tbody").append('<tr><td>' + value.username + '</td><td>' + value.name + '</td><td>' + value.address + '</td></tr>')
            });
        }).catch((err) => { alert(err); })
}