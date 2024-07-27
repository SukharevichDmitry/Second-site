const apiKey = '3fbb50ee70f8c16d13caffaf764369a65ccae6d3';
const LOCAL_STORAGE_KEY = 'dealCreated';

function sendRequestToPipedriveAPI(deal) {
    fetch('https://api.pipedrive.com/v1/deals?api_token=' + apiKey, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deal)
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json().then(data => {
            console.log('Response data:', data);
            if (response.ok) {
                console.log('Запрос к API Pipedrive выполнен успешно.');
                return data;
            } else {
                console.log('Ошибка при выполнении запроса к API Pipedrive.');
                throw new Error(data.error || 'Unknown error');
            }
        });
    })
    .then(data => {
        if (data && data.data && data.data.id) {
            const pipedriveUrl = `https://dmitrysukharevich.pipedrive.com/deal/${data.data.id}`;
            const thirdSiteUrl = `https://sukharevichdmitry.github.io/Third-site?url=${encodeURIComponent(pipedriveUrl)}`;
            
            console.log('Redirecting to:', thirdSiteUrl);
            // Открываем thirdSiteUrl в том же окне
            window.location.href = thirdSiteUrl;
        } else {
            console.error('Не удалось получить идентификатор дела из ответа:', data);
        }
    })
    .catch(error => {
        console.log('Ошибка при выполнении запроса к API Pipedrive: ' + error.message);
    });
}

window.addEventListener('message', function(event) {
    // Проверяем источник сообщения
    if (event.origin !== 'https://sukharevichdmitry.github.io') return;

    // Проверяем, было ли уже создано дело
    if (localStorage.getItem(LOCAL_STORAGE_KEY) === 'true') {
        console.log('Дело уже создано.');
        return; 
    }

    var inputInfo = event.data;
    console.log('Полученные данные:', inputInfo);

    var pipedriveDeal = {
        title: 'Job from iframe',
        '4c4d96e6eeba926553699dffbb865509da63f59f': inputInfo.address,
        'bd2880ef1545ad3a87214ba775cbf8cf475a940c': inputInfo.jobType,
        '7b7a9026f79c39c94e0231c8b9f22833e30e5e94': inputInfo.scheduleDate,
        '7379a510b4d98e6a4d25c9b4a9801b1bccb38d01': inputInfo.startTime,
        'd91cf0b42a8bcbd8ec7400b0e278e787ea19cf5e': inputInfo.endTime,
        'a287c45e151cefe1f690b800b034921467ba1c4d': inputInfo.area,
        'aaa68fb0dc680d9dab59cbd3bfe105a25aa3cbdd': inputInfo.area,
        'eddcc194169f6cf2340bf86c6973a481881218dd': inputInfo.jobDetails,
    };

    // Устанавливаем флаг, чтобы предотвратить повторное создание дела
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    
    sendRequestToPipedriveAPI(pipedriveDeal);
});

window.onload = function () {
    var iframe = document.getElementById('myIframe');
    iframe.src = 'https://sukharevichdmitry.github.io/Javascript-developer-intern-first-test-task/';
};
