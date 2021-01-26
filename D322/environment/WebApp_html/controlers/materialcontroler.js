window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    listMaterial();
}


function listMaterial() {
    fetch("http://127.0.0.1:8080/materials", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
    })
        .then(res => res.json())
        .then((out) => {
            $("#tabelaMateriais tbody").empty();
            $.each(out, function (index, value) {
                $("#tabelaMateriais tbody").append('<tr><td>' + value.cod_material + '</td><td>' + value.description + '</td><td>' + value.stock + '</td><td>' + value.material_cost + '</td></tr>')
            });
        }).catch((err) => { alert(err); })
}


