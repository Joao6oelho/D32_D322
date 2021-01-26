function registerMaterial() {
    let data = {};
    data.description = document.getElementById("descricao").value;
    data.stock = document.getElementById("quantidade").value;
    data.material_cost = document.getElementById("custo_material").value;

    //alert(JSON.stringify(data));

    try {
        fetch("http://127.0.0.1:8080/materials", {
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


