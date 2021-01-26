window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    listProfissionaisTerreno();
}

function listProfissionaisTerreno() {
    fetch("http://127.0.0.1:8080/operationals/ocupados", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
    })
        .then(res => res.json())
        .then((out) => {
            $("#tabelaProfessionais tbody").empty();
            $.each(out, function (index, value) {

                fetch('http://127.0.0.1:8080/operationals')
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
                                    if (data[i].cod_operational == value.operational_cod_operational) {
                                        $("#tabelaProfessionais tbody").append('<tr><td>' + value.operational_cod_operational + '</td><td>' + data[i].name + '</td><td>' + data[i].formation + '</td><td>' + value.occurrence_cod_occurrence + '</td></tr>')
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