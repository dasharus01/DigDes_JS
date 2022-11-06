var butQuote = document.getElementById("butQuote");
var listQuote = document.getElementsByClassName("listQuote")[0];

var elementReq = new XMLHttpRequest();


//Проверка на корректность получения данных 
function stateList() {
	if (elementReq.readyState == 4) {
		var status = elementReq.status;
		if (status != 200) {
				listQuote.innerHTML = "Ошибка. Данные не получить";
				
		} 
		else {
			//извлекаем данные
			data = JSON.parse(elementReq.responseText);	
			
			//если извличение не произошло
			if (!data){
				listQuote.innerHTML = "Ошибка. Данные не получить";
			}
			else{
			//формируем результат
				formRes(data);
			}
		}
	}
}

//Асинхронный вызов
function asinchRequest(){
	elementReq.onload = stateList;								
	elementReq.open("GET", "https://favqs.com/api/qotd", true);
	elementReq.send();
}

function formRes(data){
	//поэтапное обращение к JSON
	var quote = data["quote"]
	//вывод данных через параграфы
	listQuote.innerHTML = "<p>"
	+  'Автор: ' + quote["author"] + "</p>"
	+"<p>" + 'Цитата: ' + quote["body"] + "</p>";
}





//выполнение запрос через час
let intervalEl = setInterval(() => asinchRequest(), 60*60*1000);


//обработку события на клик
butQuote.addEventListener('click', asinchRequest); 

	

