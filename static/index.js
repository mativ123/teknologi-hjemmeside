var point = 0;
var kurvList = [];
var promille = "";

async function httpGetAsync(daurl)
{
    const response = await fetch(daurl);
    if(response.ok)
    {
        return await response.json();
    }
}

function render()
{
    fetch("/api/update").then((res) => {
        res.json().then((json) => {
            point = json["num"];
            if(json["alk"] != "")
            {
                promille = json["alk"];
            }
        });
    });

    setTimeout(render, 1000);
}

render()

function addKurv(str, n)
{
    if(n <= point)
    {
        kurvList.push(str);
        document.getElementById("kurvList").innerHTML = kurvList;
        point -= n
        fetch('/api/remove', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:   JSON.stringify({"amount": n}),
        })
    }
}

function main()
{
    document.getElementById("points").innerHTML = "Points: " + point;
    document.getElementById("alkohol").innerHTML = "Promille: " + promille;

    setTimeout(main, 10);
}

main();
