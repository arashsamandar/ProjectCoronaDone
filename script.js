const api_url = 'https://api.covid19api.com/summary';
var dropDownSelector = document.getElementById('selectCountry');
var api_countries = [];
var api_getCountrySpecifics = [];

// Initializing The Api ///
    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }  

    getData(api_url).then(response => { // do while there is a response
        
        for( var i=0 ; i < 190 ; i++ ) {
            //  console.log(response.Countries[i].Country);
             api_countries.push(response.Countries[i].Country);
             api_getCountrySpecifics.push(response.Countries[i]);
        }
        // Populating The DropDown
        for(var j = 0 ; j < 190 ; j++) {
            var opt = api_countries[j];
            var specifics = api_getCountrySpecifics[j]
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = JSON.stringify(specifics);
            // console.log(specifics);
            // console.log(opt);
            dropDownSelector.appendChild(el);
        }
});

function myFunction() {
    var x = document.getElementById("selectCountry").selectedIndex;
    result = document.getElementsByTagName("option")[x].value;
    result = JSON.parse(result);
    console.log(result.TotalConfirmed + " | " + result.TotalDeaths + " | " + result.TotalRecovered);
    
    //------------------- START OF THE CHART-----------------------------
    Chart.helpers.each(Chart.instances, function (instance) {
        instance.destroy();
   });
    let myChart = document.getElementById('myChart').getContext('2d');
        let massPopChart = new Chart(myChart,{
            type:'bar',
            data:{
                labels:['Total Deseased','Total Recovered','Total Deaths'],
                datasets:[{
                    label:'Corona Virus',
                    data:[
                        result.TotalConfirmed,
                        result.TotalRecovered,
                        result.TotalDeaths
                    ],
                    backgroundColor:['green','orange','red'],
                }]
            },
            Options : {
                title:{
                    display:true,
                    text:'Corona Virus Around The World',
                    fontSize:25
                }
            }
        });
        
}