window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    listCandidatos();
}

function listCandidatos() {
    fetch("http://127.0.0.1:8080/operationals/posto/102", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
    })
        .then(res => res.json())
        .then((out) => {
            $("#listaPedidos tbody").empty();
            $.each(out, function (index, value) {

                fetch('http://127.0.0.1:8080/api/especialidade')
                    .then(
                        function (response) {
                            if (response.status !== 200) {
                                console.warn('Looks like there was a problem. Status Code: ' +
                                    response.status);
                                return;
                            }

                            // Examine the text in the response  
                            response.json().then(function (data) {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].cod_specialty == value.specialty_cod_specialty) {
                                        $("#listaPedidos tbody").append('<tr><td>' + value.cod_operational + '</td><td>' + value.name + '</td><td>' + value.email + '</td><td>' + value.complement_address + '</td><td>' + value.formation + '</td><td>' + data[i].description + '</td><td>' + value.citizan_card + '</td><td>' + value.birth_date + '</td><td>' + '<button class="mb-2 mr-2 btn btn-success" onclick="aceitarCandidato();">Aceitar</button >' + '<button class="mb-2 mr-2 btn btn-danger" onclick="rejeitarCandidato();">Rejeitar</button >' + '</td></tr>')
                                    }
                                }
                            });
                        }
                    )
                    .catch(function (err) {
                        console.error('Fetch Error -', err);
                    });


            });
        })
        .catch((err) => { alert(err); })
}

function aceitarCandidato() {
    $('#listaPedidos tbody').on('click', '.btn', function () {
        let currow = $(this).closest('tr');
        let cod_operational = currow.find('td:eq(0)').text();

        try {
            fetch(`http://127.0.0.1:8080/operationals/${cod_operational}/posto/101`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            })
                .then(res => res.json())
        } catch (err) {
            alert(err);
        }

    })
    location.reload();
}

function rejeitarCandidato() {
    $('#listaPedidos tbody').on('click', '.btn', function () {
        let currow = $(this).closest('tr');
        let cod_operational = currow.find('td:eq(0)').text();

        try {
            fetch(`http://127.0.0.1:8080/operationals/${cod_operational}`, {
                method: 'DELETE'
            })
        } catch (err) {
            alert(err);
        }

    })
    location.reload();
}