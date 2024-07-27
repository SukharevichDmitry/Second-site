const apiKey = '3fbb50ee70f8c16d13caffaf764369a65ccae6d3';

function sendRequestToPipedriveAPI(deal) {
    fetch('https://api.pipedrive.com/v1/deals?api_token=' + apiKey, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deal)
    })
    .then(response => {
        if (response.ok) {
            console.log('Запрос к API Pipedrive выполнен успешно.');
            return response.json(); // Возвращаем ответ в формате JSON
        } else {
            console.log('Ошибка при выполнении запроса к API Pipedrive.');
            return response.json().then(errorData => {
                console.error('Ошибка:', errorData);
            });
        }
    })
    .then(data => {
        if (data && data.data && data.data.id) {
            const pipedriveUrl = `https://dmitrysukharevich.pipedrive.com/deal/${data.data.id}`;
            const thirdSiteUrl = `https://sukharevichdmitry.github.io/Third-site?url=${encodeURIComponent(pipedriveUrl)}`;
            window.open(thirdSiteUrl, '_blank'); 
        }
    })
    .catch(error => {
        console.log('Ошибка при выполнении запроса к API Pipedrive: ' + error);
    });
}

window.addEventListener('message', function(event) {
    if (event.origin !== 'https://sukharevichdmitry.github.io') return;

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

    sendRequestToPipedriveAPI(pipedriveDeal);
});

window.onload = function () {
    var iframe = document.getElementById('myIframe');
    iframe.src = 'https://sukharevichdmitry.github.io/Javascript-developer-intern-first-test-task/';
};
