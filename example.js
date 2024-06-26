//U46368100
function stockData() {

    let csvElements
    let stockName
    let startDate
    let endDate
    let filteredArray

    const width = 600
    const height = 600
    //Creates SVG
    d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    //Loads CSV data into csvElements variable 
    d3.csv('mock_stock_data.csv').then(
        function (d) {
            csvElements = d

        })
    document.getElementById("stockDashboard").addEventListener("submit", (event) => {


        event.preventDefault()
        stockName = document.getElementById("stockName").value
        startDate = document.getElementById("startDate").value
        endDate = document.getElementById("endDate").value
        if (endDate <= startDate) {
            alert("End date must be after Start date.");
            return;

        }
        //Reset the stockDashboard form
        document.getElementById("stockDashboard").reset()
        //Filters csv columns between google and apple stock based on stock Name selected on the Stock Dashboard page
        filteredArray = csvElements.filter((csvElement) => {
           
            return csvElement.Stock === stockName && csvElement.Date >= startDate && csvElement.Date <= endDate;

        })
        let prices = filteredArray.map(({ Price }) => Number(Price))
        let dates = filteredArray.map(({ Date }) => Date)
        
        let svg = d3.select('svg')
        svg.selectAll("*").remove();
        let xScale = d3.scaleBand()
            .domain(dates)
            .range([0, width - 50])
            .padding(0.1)
        let yScale = d3.scaleLinear()
            .domain([100, 170])
            .range([height - 50, 0])
        let x_axis = d3.axisBottom()
            .scale(xScale)
        let y_axis = d3.axisLeft()
            .scale(yScale)
        svg.append('g')
            .attr('transform', 'translate(50,10)')
            .call(y_axis)
        svg.append('g')
            .attr('transform', 'translate(50,' + (height - 40) + ')')
            .call(x_axis)
        svg.selectAll('bar')
            .data(prices)
            .enter().append('rect')
            .on("mouseover", function (event, d) { mouseOverEvent(event, d, this, dates, prices); })
            .on("mouseout", reset).attr('fill', 'green').attr('class', 'bar')
            .attr('x', function (d, i) { return xScale(dates[i]) + 50 })
            .attr('y', function (d) { return yScale(d) + 10 })
            .attr('width', xScale.bandwidth())
            .attr('height', function (d) { return height - 50 - yScale(d) })


        function mouseOverEvent(event, d, element, dates, prices) { 
            let xPos = parseFloat(d3.select(element).attr('x')) 
            let yPos = parseFloat(d3.select(element).attr('y')) 
            let index = prices.indexOf(d); let date = dates[index]; 
            let price = prices[index]; 
            d3.select('#hoverOver') 
            .style('left', xPos + 'px') 
            .style('top', yPos + 'px') 
            .select('#hoverOverStockdata')
            .html(`Stock: ${stockName}<br>Date: ${date}<br>Price: ${price}`)
            d3.select('#hoverOver').classed('hidden', false); 
            d3.select(element).attr('class', 'highlight') 
        }

        function reset() {
            d3.select(this).attr('class', 'bar')
            d3.select('#hoverOver').classed('hidden', true);

        }


    }


    )
}
