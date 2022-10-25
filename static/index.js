console.log("din mor");
var point = 0;
var kurvList = [];

function plusPoint(n)
{
    point += n;
    document.getElementById("points").innerHTML = "Points: " + point;
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
