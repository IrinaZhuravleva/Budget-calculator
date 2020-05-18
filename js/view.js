var viewController = (function () {

    var DOMstrings = {
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        form: "#budget-form",
        incomeContainer: "#income__list",
        expenseContainer: "#expenses__list",
        budgetLabel:'#budget-label',
        incomeLabel: '#income-label',
        expensesLabel: '#expense-label',
        expensesPercentLabel: '#expense-percent-label',
        budgetTable: '#budget-table',
        monthLabel: '#month',
        yearLabel: '#year'
    }

    function getInput() {
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
        }
    }

    function formatNumber(num, type) {
        var numSplit, int, dec, newInt, resultNumber;
        //50 -> 50.00 
        num = Math.abs(num);
        //2 цифры после запятой
        num = num.toFixed(2);
        //разделим на целое и дробное - 12,000.00
        numSplit = num.split('.'); // 45.78 => [45, 78]
        int = numSplit[0]; //45
        dec = numSplit[1]; //78

        //идем с правого края и каждые три числа проставляем запятую
        if(int.length > 3) {
            //формируем "красивую" строчку newInt
            newInt = '';
            
            for (var i = 0; i < int.length / 3; i++) {
                //вырезает подстроку из строки
                newInt = 
                ',' + int.substring(int.length - 3 * (i + 1), int.length - 3*i) + newInt;
                
            }
            //убираем первую запятую в начале, если она есть
            if (newInt[0] === ',') {
                newInt = newInt.substring(1);
            }

        } else if (int === '0') {
            newInt = '0';
        } else {
            newInt = int;
        }

        resultNumber = newInt + '.' + dec;
        debugger
        if (type === 'exp' && resultNumber != '0.00') {
            resultNumber = '- ' + resultNumber;
        } else if (type === 'inc' && resultNumber != '0.00') {
            resultNumber = '+ ' + resultNumber;
        } else {
            resultNumber = resultNumber;
        }
        return resultNumber;
    }

    // Генерируем кусок кода для вставки в нужный контейнер
    function renderListItem(obj, type) {
        var containerElement, html, newHtml;
        if(type === 'inc'){
            containerElement = DOMstrings.incomeContainer;
            html = `<li id="inc-%id%" class="budget-list__item item item--income">
                        <div class = "item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">%value%</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    </li>`;
        } else {
            containerElement = DOMstrings.expenseContainer;
            html = `<li id="exp-%id%" class="budget-list__item item item--expense">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">%value%
                                <div class="item__badge">
                                    <div class="item__percent badge badge--dark">
                                        15%
                                    </div>
                                </div>
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>`;
        }

        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

        document.querySelector(containerElement).insertAdjacentHTML('beforeend', newHtml);

    }

    function clearFields() {
        var inputDesc, inputVal;
        inputDesc = document.querySelector(DOMstrings.inputDescription);
        inputVal = document.querySelector(DOMstrings.inputValue);
        inputDesc.value = '';
        inputDesc.focus();
        inputVal.value = '';
    }

    function updateBudget(obj) {
        var type;
        if (obj.budget > 0) {
            type = 'inc'
        } else {
            type = 'exp'
        }
        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
        document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
        if (obj.percentage > 0 ){
        document.querySelector(DOMstrings.expensesPercentLabel).textContent = obj.percentage;
        } else {
            document.querySelector(DOMstrings.expensesPercentLabel).textContent = '--';
        }
    }

    function deleteListItem(itemID) {
        document.getElementById(itemID).remove();

    }

    function updateItemsPercentages(items) {
        items.forEach(function(item) {
            console.log('item: ', item);
            var el = document.getElementById(`exp-${item[0]}`).querySelector('.item__percent');
            console.log('el: ', el);
           
            if(item[1] >= 0) {
                el.parentElement.style.display = 'block';
                el.textContent = item[1] + ' %';
            } else {
                el.parentElement.style.display = 'none';
            }
        })
    }

    function displayMonth() {
        var now, year, month, monthArr;

        now = new Date();
        year = now.getFullYear();
        month = now.getMonth();

        monthArr = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        month = monthArr[month];

        document.querySelector(DOMstrings.monthLabel).innerText = month; //почему у меня март?
        document.querySelector(DOMstrings.yearLabel).innerText = year;
    }

    return {
        getInput: getInput,
        renderListItem: renderListItem,
        clearFields: clearFields,
        updateBudget: updateBudget,
        deleteListItem: deleteListItem,
        updateItemsPercentages: updateItemsPercentages,
        displayMonth: displayMonth,
        getDomStrings: function () {
            return DOMstrings;
        }
    }

})();