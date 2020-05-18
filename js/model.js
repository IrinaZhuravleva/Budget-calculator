var modelController = (function() {

    //структура данных для наполнения
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        // Это флаг (-1)
        this.percentage = -1;
    }

    //метод, который рассчитывает проценты для объекта
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function (){
        return this.percentage;
    }



    function addItem(type, desc, val) {
        var newItem, ID;

        //проверяем, есть ли у нас уже данные такого типа, чтобы задать ID для нового элемента
        if (data.allItems[type].length > 0) {
            //если есть, то находим индекс последнего эл-та в массиве
            var lastIndex = data.allItems[type].length - 1;
            //получаем по этому индексу сам элемент, берем его id и увеличиваем на единицу, чтобы получить ID
            //для нового элемента (последний элемент в массиве будет иметь последний ID)
            ID = data.allItems[type][lastIndex].id + 1;
        } else {
            ID = 0;
        }
        
        if(type === 'inc') {
            newItem = new Income(ID, desc, parseFloat(val));
        // } else if (type === 'exp') {
        } else {
            newItem = new Expense(ID, desc, parseFloat(val));
        }

        data.allItems[type].push(newItem);
        return newItem;
    }

    function deleteItem(type, id) {

        //map проходит по массиву и возвращает новый массив
        var ids = data.allItems[type].map(function (item){
            return item.id
        })
        index = ids.indexOf(id);

        if (index !== -1) {
            //удаляем методом splice, где первый аргумент - с чего начать удалять, второй - сколько элементов удалить
            data.allItems[type].splice(index, 1);
            // console.log(data.allItems);
        }
    }

    function calculateTotalSum(type) {
        var sum = 0;
        // data.allItems.inc.forEach(function(item){ меняем на!!!!!!
        data.allItems[type].forEach(function (item) {
            sum = sum + item.value;
        })
        return sum;
    }

    function calculateBudget() {
        data.totals.inc = calculateTotalSum('inc');
        // console.log('data.totals.inc: ', data.totals.inc);

        data.totals.exp = calculateTotalSum('exp');
        // console.log('data.totals.exp: ', data.totals.exp);

        data.budget = data.totals.inc - data.totals.exp;

        if (data.totals.inc > 0){

            //Получить общий бюджет
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            // console.log('data.percentage: ', data.percentage);
        } else {
            data.percentage = -1;
        }
    }

    function getBudget(){
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
        }
    }

    function calculatePercentages() {
        data.allItems.exp.forEach(function(item){
            //проходим по всем объектам и для каждого рассчитываем его процент
            item.calcPercentage(data.totals.inc);
        })
    }

    function getAllIdsAndPercentages() {
        // [
        //     [0, 15],[1, 25],[3, 10]
        // ]
        var allPerc = data.allItems.exp.map(function(item){
            return [item.id, item.getPercentage()];
        })
        return allPerc;
    }

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,

        //-1 - флаг, что проценты не заданы и мы их не выводим
        percentage: -1
    }

    return {
        addItem: addItem,
        calculateBudget: calculateBudget,
        getBudget: getBudget,
        deleteItem: deleteItem,
        calculatePercentages: calculatePercentages,
        getAllIdsAndPercentages: getAllIdsAndPercentages,
        
        test: function() {
            console.log(data);
        }
    }


}) ();