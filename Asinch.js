var butQuote = document.getElementById("butQuote");
var ListQuote = document.getElementsByClassName("ListQuote")[0];

var ElementReq = new XMLHttpRequest();


//Проверка на корректность получения данных 
function StateList() {
	if (ElementReq.readyState == 4) {
		var status = ElementReq.status;
		if (status != 200) {
				ListQuote.innerHTML = "Ошибка. Данные не получить";
				
		} 
		else {
			//извлекаем данные
			data = JSON.parse(ElementReq.responseText);	
			
			//если извличение не произошло
			if (!data){
				ListQuote.innerHTML = "Ошибка. Данные не получить";
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
	ElementReq.onload = StateList;								
	ElementReq.open("GET", "https://favqs.com/api/qotd", true);
	ElementReq.send();
}

function formRes(data){
	//поэтапное обращение к JSON
	var quote = data["quote"]
	//вывод данных через параграфы
	ListQuote.innerHTML = "<p>"
	+  'Автор: ' + quote["author"] + "</p>"
	+"<p>" + 'Цитата: ' + quote["body"] + "</p>";
}





//выполнение запрос через час
let intervalEl = setInterval(() => asinchRequest(), 60*60*1000);


//обработку события на клик
butQuote.addEventListener('click', asinchRequest); 

	

