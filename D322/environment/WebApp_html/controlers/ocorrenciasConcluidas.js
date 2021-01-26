window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    listOcorrencia();
}

function listOcorrencia() {

    fetch("http://127.0.0.1:8080/events/estado/3", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
    })
        .then(res => res.json())
        .then((out) => {
            $("#tabelaOcorrencias tbody").empty();
            $.each(out, function (index, value) {
                $("#tabelaOcorrencias tbody").append('<tr><td>' + value.cod_occurrence + '</td><td>' + value.operation_cust + '</td><td>' + value.initial_date + '</td><td>' + value.final_date + '</td></tr>')
            });
        }).catch((err) => { alert(err); })
}