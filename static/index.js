var point = 0;
var tPoint = point;
var kurvList = [];

function plusPoint(n)
{
    point += n;
}

function addKurv(str, n)
{
    if(n <= point)
    {
        kurvList.push(str);
        document.getElementById("kurvList").innerHTML = kurvList;
        plusPoint(-n);
    }
}

function main()
{

    if(tPoint != point)
    {
        document.getElementById("points").innerHTML = "Points: " + point;
        tPoint = point;
    }

    setTimeout(main, 10);
}

main();
