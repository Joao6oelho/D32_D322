window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    listProfessionals();
}

function listProfessionals() {

    fetch("http://127.0.0.1:8080/operationals/api/profissionais", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
    })
        .then(res => res.json())
        .then((out) => {
            $("#tabelaProfissionais tbody").empty();
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
                                        $("#tabelaProfissionais tbody").append('<tr><td>' + value.cod_operational + '</td><td>' + value.name + '</td><td>' + value.email + '</td><td>' + value.complement_address + '</td><td>' + value.formation + '</td><td>' + data[i].description + '</td><td>' + value.citizan_card + '</td><td>' + value.birth_date + '</td></tr>')

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


