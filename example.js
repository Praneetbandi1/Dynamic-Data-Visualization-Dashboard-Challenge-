function stockData() {
    let csvElements
    let stockName
    let startDate
    let endDate
    let filteredArray

    //Loads CSV data into csv Elements variable
    d3.csv('mock_stock_data.csv').then(
        function (d) {
            csvElements=d

        })
        document.getElementById("stockDashboard").addEventListener("submit",(event)=>{
            event.preventDefault()
            stockName=document.getElementById("stockName").value
            startDate=document.getElementById("startDate").value
            endDate=document.getElementById("endDate").value
            if (endDate <=startDate) {
                alert ("End date must be after Start date.");
                return;

            }
            //Reset the stockDashboard form
            document.getElementById("stockDashboard").requestFullscreen()
            //Filters csv columns between google and apple stock based on stock Name selected on the Stock Dashboard page
            filteredArray=csvElements.filter((csvElement)) => {
                return csvElement.Stock === stockName

         } 
         let prices=filteredArray.map(({Price})) => Number(Price)
         let dates=filteredArray.map(({Date})) =>  Date
         function reset() {
            d3.select(this).attr('class','bar')
            d3.select('#hoverover').classed('hidden',true);

         }


        }
    
    
}