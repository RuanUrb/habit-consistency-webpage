class Habits{
    constructor(name, streak, all){
        this.name = name;
        this.streak = streak;
        this.all = all;
    }
}

function getFromInput()
{
    return document.getElementById('habitName').value.trim();
}


function counter()
{
    return localStorage.length.toString();
}

function addHabit()
{
    let name = getFromInput();
    if(/[^A-Za-z0-9 ]/.test(name) || !/\w/.test(name)) return;
    document.getElementById('habitName').value = ' ';
    let habit = new Habits(name, 0, 0);
    window.localStorage.setItem(counter(), JSON.stringify(habit));
    let habitElement = document.createElement('h2');
    habitElement.innerHTML = habit['name'] + '<br>' + habit['streak'] + ' day streak.' + '<br>' + habit['all'] + ' so far.';
    document.getElementById('habitsList').appendChild(habitElement);
}

function refresh()
{
    for(let i = 0; i < window.localStorage.length; i++)
    {
        let item = JSON.parse(window.localStorage.getItem(i.toString()));
        if(item != null)
        {
            let element = document.createElement('h2');
            element.innerHTML = item['name'] + '<br>' + item['streak'] + ' day streak.' + '<br>' + item['all'] + ' so far.';
            document.getElementById('habitsList').appendChild(element);
        }
    }
}

function done()
{
    let name = getFromInput();
    for(let i = 0; i < window.localStorage.length; i++)
    {
        let item = JSON.parse(window.localStorage.getItem(i.toString()));
        if(item.name == name)
        {
            if(item.streak === item.all) item.all += 1;
            item.streak += 1;
            window.localStorage.removeItem(i.toString());
            window.localStorage.setItem(i.toString(), JSON.stringify(item));
            location.reload();
        }
    }
}

function notDone()
{
    let name = getFromInput();
    for(let i = 0; i < window.localStorage.length; i++)
    {
        let item = JSON.parse(window.localStorage.getItem(i.toString()));
        if(item.name == name)
        {
            if(item.streak >= item.all) item.all = item.streak;
            item.streak = 0;
            window.localStorage.removeItem(i.toString());
            window.localStorage.setItem(i.toString(), JSON.stringify(item));
            location.reload();
        }

    }
}

function work()
{
    if(confirm('Are you sure you want to clear all habits?'))
    {
        window.localStorage.clear();
        location.reload();
    } 
}
