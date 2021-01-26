window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    listOcorrencia();
    listEvent();
    listProfessionals();
}

function listOcorrencia() {

    fetch("http://127.0.0.1:8080/events/estado/2", {
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

function listEvent() {
    let dropdown = document.getElementById('idOcorrencia');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Escolher Ocorrencia';
    defaultOption.value = '';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'http://127.0.0.1:8080/events/estado/2';

    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response  
                response.json().then(function (data) {
                    let option;

                    for (let i = 0; i < data.length; i++) {
                        option = document.createElement('option');
                        option.text = data[i].cod_occurrence;
                        option.value = data[i].cod_occurrence;
                        dropdown.add(option);
                    }
                });
            }
        )
        .catch((err) => { alert(err); });
}

function listProfessionals() {

    fetch("http://127.0.0.1:8080/operationals/livres", {
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
                                        $("#tabelaProfissionais tbody").append('<tr><td>' + value.cod_operational + '</td><td>' + value.name + '</td><td>' + value.formation + '</td><td>' + data[i].description + '</td><td>' + '<input type="checkbox" name="users[]">' + '</td></tr>')
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


async function getSugestao() {
    let quantidade = document.getElementById('exampleQuantidade');
    let cod_occurrence = document.getElementById('idOcorrencia').value;

    if (cod_occurrence != 0) {
        let response = await fetch(`http://127.0.0.1:8080/events/${cod_occurrence}/numberOperationals`);
        let json = await response.json();

        let string = (JSON.stringify(json));
        let obj = (JSON.parse(string)[0].dimensao);
        let dimensao = parseInt(obj);

        let quantidadeOperacionais;
        if (dimensao < 10) {
            quantidadeOperacionais = 2;
            quantidade.setAttribute('value', quantidadeOperacionais);
        }
        else if (dimensao >= 10) {
            quantidadeOperacionais = parseInt(dimensao * 0.2);
            quantidade.setAttribute('value', quantidadeOperacionais);
        }

    } else {
        alert('Selecione uma ocorrencia');
        cod_occurrence.focus();
    }

}


function alocarOperacionais() {
    let cod_occurrence = document.getElementById('idOcorrencia').value;

    //Reference the Table.
    let grid = document.getElementById("tabelaProfissionais");

    //Reference the CheckBoxes in Table.
    let checkBoxes = grid.getElementsByTagName("INPUT");

    //Loop through the CheckBoxes.
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            let row = checkBoxes[i].parentNode.parentNode;
            let cod_operational = parseInt(row.cells[0].innerHTML);

            let data = {};
            data.presence = 0;

            if (cod_occurrence != 0) {
                try {
                    fetch(`http://127.0.0.1:8080/events/${cod_occurrence}/operationals/${cod_operational}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(data),
                    })
                        .then(res => res.json())
                        .then(function (data) {
                            location.reload();
                        })
                } catch (err) {
                    alert(err);
                }
            } else {
                alert('Selecione uma ocorrencia');
                cod_occurrence.focus();
            }
        }
    }
}
