window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    listMaterial();
    listEvent();
    getMaterialID();
    getEvent();
}

function getMaterialID() {
    let idMaterial = document.getElementById('exampleIDMaterial');
    let dropdownMaterial = document.getElementById('descricao');

    let valueM = dropdownMaterial.options[dropdownMaterial.selectedIndex].value;
    idMaterial.value = valueM;
}

function listMaterial() {
    let dropdown = document.getElementById('descricao');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Escolher Material';
    defaultOption.value = '';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'http://127.0.0.1:8080/materials';

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
                        option.text = data[i].description;
                        option.value = data[i].cod_material;
                        dropdown.add(option);
                    }
                });
            }
        )
        .catch(function (err) {
            console.error('Fetch Error -', err);
        });
}


function listEvent() {
    let dropdown = document.getElementById('idOcorrencia');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Escolher Ocorrencia';
    defaultOption.value = '';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'http://127.0.0.1:8080/events'; // /estado/2'

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
                        option.text = data[i].description;
                        option.value = data[i].cod_occurrence;
                        dropdown.add(option);
                    }
                });
            }
        )
        .catch((err) => { alert(err); });
}

function getEvent() {
    let idEvent = document.getElementById('exampleIDEvent');
    let dropdownEvent = document.getElementById('idOcorrencia');

    let dimensao = document.getElementById('exampleDimensaoOcorrencia');
    let tipo = document.getElementById('exampleTipoOcorrencia');

    let valueO = dropdownEvent.options[dropdownEvent.selectedIndex].value;
    idEvent.value = valueO;

    // console.log(valueO);
    // console.log(valueO.localeCompare('ID Ocorrencia'));

    if (valueO.localeCompare('ID Ocorrencia') == -1) {

        let url = `http://127.0.0.1:8080/events/${valueO}/dados`;

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
                        if (data.dimensao == 0) {
                            dimensao.value = '';
                        } else if (data.descricao == '') {
                            tipo.value = '';
                        } else {
                            dimensao.value = data.dimensao;
                            tipo.value = data.descricao;
                        }

                    });
                }
            )
            .catch((err) => { alert(err); });
    } else {
        dimensao.value = '';
        tipo.value = '';
    }
}

document.getElementById("validar").onclick = function () {
    atualizarStocks();
    alocarMaterial();
};

function atualizarStocks() {
    let quantity = document.getElementById("exampleQuantidade").value;
    let cod_material = document.getElementById("exampleIDMaterial").value;

    try {
        fetch(`http://127.0.0.1:8080/materials/${cod_material}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then(function (dados) {
                let info = {};
                info.cod_material = dados.cod_material;
                info.description = dados.description;
                info.stock = dados.stock - quantity;
                info.material_cost = dados.material_cost;
                alert("Stock atualizado!!");

                try {
                    fetch(`http://127.0.0.1:8080/materials/${cod_material}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'PUT',
                        body: JSON.stringify(info),
                    })
                        .then(res => res.json())

                } catch (err) {
                    alert(err);
                }


            })
    } catch (err) {
        alert(err);
    }

}

function alocarMaterial() {
    let dropdownM = document.getElementById("descricao");
    let description = dropdownM.options[dropdownM.selectedIndex].text;

    let quantity = document.getElementById("exampleQuantidade").value;
    let cod_material = document.getElementById("exampleIDMaterial").value;
    let cod_occurrence = document.getElementById("exampleIDEvent").value;

    let data = {};
    data.description = description;
    data.quantity = quantity;


    //alert(JSON.stringify(data));

    if (cod_occurrence == '') {
        alert('Necessário selecionar uma ocorrencia');
    } else if (cod_material == '') {
        alert('Necessário selecionar um material');
    } else {
        try {
            fetch(`http://127.0.0.1:8080/events/${cod_occurrence}/materials/${cod_material}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(data => alert(data))
            { alert("Material alocado!!"); }
        } catch (err) {
            alert(err);
        }
    }

}

function validation() {
    //let quantity = document.getElementById("exampleQuantidade").value;
    let cod_material = document.getElementById("exampleIDMaterial").value;
    let cod_occurrence = document.getElementById("exampleIDEvent").value;

    if (cod_occurrence == '') {
        alert('Necessário selecionar uma ocorrencia');
    } else if (cod_material == '') {
        alert('Necessário selecionar um material');
    }
}
