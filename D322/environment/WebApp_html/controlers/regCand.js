window.onload = function () {
    //chama a função para atualizar a lista de pedidos
    listEspecialidade();
}

function listEspecialidade() {
    let dropdown = document.getElementById('especialidade');
    dropdown.length = 1;

    /*let defaultOption = document.createElement('option');
    defaultOption.text = 'Escolher Especialidade';
    defaultOption.value = 'ID Especialidade';
    

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;*/

    const url = 'http://127.0.0.1:8080/api/especialidade';

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
                        option.value = data[i].cod_specialty;
                        dropdown.add(option);
                    }
                });
            }
        )
        .catch(function (err) {
            console.error('Fetch Error -', err);
        });
}

function registerCandidato() {
    let data = {};
    data.name = document.getElementById("nome").value;
    data.email = document.getElementById("email").value;
    data.complement_address = document.getElementById("exampleMorada").value;
    data.formation = document.getElementById("formacao").value;
    data.specialty_cod_specialty = document.getElementById("especialidade").value;
    data.citizan_card = document.getElementById("cartao_Cidadao").value;
    data.birth_date = document.getElementById("data_Nascimento").value;

    //alert(JSON.stringify(data));

    try {
        fetch("http://127.0.0.1:8080/operationals/posto/102", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => alert(data))
    } catch (err) {
        alert(err);
    }

}
