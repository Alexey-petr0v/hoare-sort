import Chartist from '../bower_components/chartist/dist/chartist.min.js'
// Подключение Chartist (графическая библиотека для построения графиков)

// ---- Предварительное построение пустого графика ---- //
let data = {
    labels: [],
    series: [
    []
  ]
};

let options = { seriesBarDistance: 15 };

let responsiveOptions = [
  ['screen and (min-width: 641px) and (max-width: 1024px)', {
    seriesBarDistance: 10,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value;
      }
    }
  }],
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) { return value[0] }
    }
  }]
];

new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
// -------------------------------------------- //

// ---- Функция генерации случайного integer числа ---- //
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// ---------------------------------------------------- //

// ---- Обработчик нажатия кнопки "Сортировать список и построить график" ---- //
button.onclick = function() {
  $("#result").text("")
  let input = document.getElementById('text_input').value
  let elements_text = input.split(",")
  let elements = elements_text.map(string => parseInt(string))
  let data = {
      labels: elements,
      series: [
        elements
    ]
  };
  let time = 1000
  let elem = new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
  let step = 0;
  let old_step;
  // -- Функция периодической проверки: а закончилась ли сортировка -- //
    /* (служит для отображения на графике последнего изменения) */
  setTimeout(function() {
    old_step = step;
    let endIntervlID = setInterval(function() {
      if (old_step == step) {
        elem.update(data, options, responsiveOptions)
        document.getElementById('text_input').value = elements
        $("#result").text("Сортировка выполнена!")
        clearInterval(endIntervlID);
      }
      else { old_step = step }
    },time*1.1)
  }, time)
  // ----------------------------------------------------------------- //

  quickSort(elements, 0, elements.length-1)

  // -- Функция сортировки и вывода результатов на графике -- //
  function quickSort(list, left, right) {
    step++
    let i = left;                
    let j = right;
    let middle = list[ Math.round(( left + right ) / 2) ];
    // - Функция замена оператора while - //
      /* (позволяет установить паузу перед выполнением
      для демонстрации работы сортировки) */
    function interval(callback_1, callback_2){
      let intervalId = setInterval(function() {
        while(list[i] < middle) { ++i }
        while(list[j] > middle) { --j }
        if(i <= j){
          let random_color = getRandomInt(999999)
          let plus = ""
          if (random_color < 100000) {plus = "6"}
          else if (random_color < 10000) {plus = "60"}
          else if (random_color < 1000) {plus = "600"}
          else if (random_color < 100) {plus = "6000"}
          else if (random_color < 10) {plus = "60000"}
          if(i < j) {
            elem.on('draw', function(data) {
              if (data.type == "bar") {
                if ((data.index == i)||(data.index == j)) {
                  $(".ct-bar").eq(j).attr("style", "stroke: #"+plus+random_color)
                  $(".ct-bar").eq(i).attr("style", "stroke: #"+plus+random_color)
                }
              }
            });
            elem.update(data, options, responsiveOptions)
          }
          callback_1(); callback_2()
        }
        if (i >= j) clearInterval(intervalId);
      }, time);
    }
    interval(function(){
      let buf = list[i];
      list[i] = list[j];
      list[j] = buf;
      i++; j--;
    },function(){
      if(left < j){ quickSort(list, left, j)}
      if(i < right){ quickSort(list, i, right) }
    });
  }
};
// --------------------------------------------------------------------------- //