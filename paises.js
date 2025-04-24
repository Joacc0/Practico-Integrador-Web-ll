function ajax(){
    const http = new XMLHttpRequest();
    const url = 'https://restcountries.com/v3.1/all';

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const paises = JSON.parse(this.responseText);
            let html = '<ul>';
            for (let i = 0; i < paises.length; i++) {
                html += `<li>${paises[i].name.common}</li>`;
            }
            html += '</ul>';
            document.getElementById('paises').innerHTML = html;
        }
    };

    http.open("GET", url, true);
    http.send();
}

document.getElementById('boton').addEventListener('click', function() {
    ajax();
});
