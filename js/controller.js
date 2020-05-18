var controller = (function (budgetCtrl, uiCtrl) {
    
    // console.log(DOM);

    var setupEventListeners = function() {
        var DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);
        document.querySelector(DOM.budgetTable).addEventListener('click', ctrlDeleteItem);
    }
    
    //Обновляем проценты по каждой записи
    function updatePercentages() {
        //1. Посчитать проценты для кажоый записи типа Expense   
        budgetCtrl.calculatePercentages();
        budgetCtrl.test();
        //2. Прлучаем данные по процентам с моделт
        // [[0, 15],[1, 25],[]]
        var idsAndPercents = budgetCtrl.getAllIdsAndPercentages();
        // console.log('idsAndPercents: ', idsAndPercents);
        //3. Обновить их в UI

        uiCtrl.updateItemsPercentages(idsAndPercents);
    }

    //Функция срабатывает при отправке формы
    function ctrlAddItem(event) {
        event.preventDefault();

        //1.Получить данные из формы
        var input = uiCtrl.getInput();
        // console.log(input);

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            //2. Добваить полученные данные в модель
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            budgetCtrl.test();
            
            //3. Добавить "запись " в UI
            uiCtrl.renderListItem(newItem, input.type);
            uiCtrl.clearFields();
            generateTestData.init();

            //4. Посчитать бюджет //5. Отобразть бюджет в UI
            updateBudget();
            updatePercentages();
        }
    }
    
    function ctrlDeleteItem(event) {
        var itemID, splitID, type, ID;
        if(event.target.closest('.item__remove')) {
            //находим id записи
            itemID = event.target.closest('li.budget-list__item').id;
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //удалить запись из модели
            budgetCtrl.deleteItem(type, ID);

            //удалить запись из шаблона
            uiCtrl.deleteListItem(itemID);

            updateBudget();

            updatePercentages();
        }
    }

    function updateBudget () {
        //1. Рассчитать бюджет в модели
        budgetCtrl.calculateBudget();

        //почему мы не объявляем эту переменную, но она всё равно работает????
        budgetObj = budgetCtrl.getBudget();

        //2. Получить рассичтанный бюджет из модели

        //3. Отображать в Шаблоне
        uiCtrl.updateBudget(budgetObj);
    }

    return {
        init: function() {
            console.log('App started!');
            uiCtrl.displayMonth();
            setupEventListeners();
            uiCtrl.updateBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
        }
    }

})(modelController,viewController);

controller.init();

