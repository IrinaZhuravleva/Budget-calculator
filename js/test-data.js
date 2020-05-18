var generateTestData = (function () {
    var ExampleItem = function (type, desc, sum) {
        this.type = type;
        this.desc = desc;
        this.sum = sum;

    }

    var testData = [
        new ExampleItem('inc','Зарплата', 1245),
        new ExampleItem('inc', 'Фриланс', 12045),
        new ExampleItem('inc', 'Партнеры', 45),
        new ExampleItem('inc', 'Продажи', 15),
        new ExampleItem('exp', 'Рента', 1045),
        new ExampleItem('exp', 'Гараж', 15),
        new ExampleItem('exp', 'Продукты', 145),
        new ExampleItem('exp', 'Развлечения', 124)
    ];

    function getRandomInt(max){
        return Math.floor(Math.random() * max);
    }

    function insertInUi(){
        var random = getRandomInt(testData.length);
        var randomItem = testData[random];
        getRandomInt(testData.length);
        document.querySelector('#input__type').value = randomItem.type;
        document.querySelector('#input__description').value = randomItem.desc;
        document.querySelector('#input__value').value = randomItem.sum;
    }

    return {
        init: insertInUi
    }
    
})();

generateTestData.init();