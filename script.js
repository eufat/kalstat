Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function harmonic(arr){
    var s = 0;
    for (var i = 0; i < arr.length; i++){
        s  += (1 / arr[i]);
    }

    return arr.length / s;
}

var Content = React.createClass({
    getInitialState: function() {
        return {
            data : "",
            size: "",
            sum: "",
            min: "",
            max: "",
            mean: "",
            geomean: "",
            median: "",
            mode: "",
            range: "",
            stdev: "",
            meandev: "",
            meddev: "",
            skewness: "",
            kurtosis: "",
            coeffvar: "",
            quartile1: "",
            quartile3: "",
            sumsqrd: "",
            variance: "",
            iqr: "",
            harmomean: "",
            product: "",
            iod: ""
        };
    },
    handleChange: function(event){
        this.setState({data: event.target.value});
        var d = event.target.value;
        d = d.replace(/ /g,'');
        console.log('before', d);
        var re = /\s*,\s*/;
        d = d.split(re).map(Number);
        if (d[d.length-1] === 0){
            d.remove(d.length-1);
        }

        console.log('after',d);
        var size = d.length;
        var sum = jStat.sum(d);
        var sumsqrd = jStat.sumsqrd(d);
        var min = jStat.min(d);
        var max = jStat.max(d);
        var mean = jStat.mean(d);
        var geomean = Number((jStat.geomean(d)).toFixed(10));
        var harmomean = Number((harmonic(d)).toFixed(10));
        var median = Number((jStat.median(d)).toFixed(10));
        var quartile = jStat.quartiles(d);
        var quartile1 = quartile[0];
        var quartile3 = quartile[2];
        var iqr = quartile3 - quartile1;
        var mode = jStat.mode(d);
        if (Array.isArray(mode)){
            mode = mode.toString();
        }
        var range = jStat.range(d);
        var stdev = Number((jStat.stdev(d)).toFixed(10));
        var variance = Number((Math.pow(stdev, 2)).toFixed(10));
        var meandev = Number((jStat.meandev(d)).toFixed(10));
        var meddev = Number((jStat.meddev(d)).toFixed(10));
        var skewness = Number((jStat.skewness(d)).toFixed(10));
        var kurtosis = Number((jStat.kurtosis(d)).toFixed(10));
        var coeffvar = Number((jStat.meddev(d)).toFixed(10));
        var product = jStat.product(d);
        var iod = variance / mean;


        this.setState({size, sum, min, max, mean, geomean, median, mode, range, stdev, meandev, meddev, skewness, kurtosis, coeffvar, quartile1, quartile3, sumsqrd, variance, iqr, harmomean, product, iod}) ;
    },
    render: function () {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <input type="text" onChange={this.handleChange} className="form-control" id="data" placeholder="misal. 12, 3, 4.5, 47, ..." />
                    </div>
                </form>
                <table className="table">
                    <tbody>
                    <tr>
                        <td>Size</td>
                        <td>{this.state.size}</td>
                    </tr>
                    <tr>
                        <td>Sum</td>
                        <td>{this.state.sum}</td>
                    </tr>
                    <tr>
                        <td>Sum Squared</td>
                        <td>{this.state.sumsqrd}</td>
                    </tr>
                    <tr>
                        <td>Vector Product</td>
                        <td>{this.state.product}</td>
                    </tr>
                    <tr>
                        <td>Minimum</td>
                        <td>{this.state.min}</td>
                    </tr>
                    <tr>
                        <td>Maximum</td>
                        <td>{this.state.max}</td>
                    </tr>
                    <tr>
                        <td>Arithmetic Mean</td>
                        <td>{this.state.mean}</td>
                    </tr>
                    <tr>
                        <td>Geometric Mean</td>
                        <td>{this.state.geomean}</td>
                    </tr>
                    <tr>
                        <td>Harmonic Mean</td>
                        <td>{this.state.harmomean}</td>
                    </tr>
                    <tr>
                        <td>1st Quartile</td>
                        <td>{this.state.quartile1}</td>
                    </tr>
                    <tr>
                        <td>Median / 2nd Quartile</td>
                        <td>{this.state.median}</td>
                    </tr>
                    <tr>
                        <td>3rd Quartile</td>
                        <td>{this.state.quartile3}</td>
                    </tr>
                    <tr>
                        <td>IQR</td>
                        <td>{this.state.iqr}</td>
                    </tr>
                    <tr>
                        <td>Mode</td>
                        <td>{this.state.mode}</td>
                    </tr>
                    <tr>
                        <td>Range</td>
                        <td>{this.state.range}</td>
                    </tr>
                    <tr>
                        <td>Variance</td>
                        <td>{this.state.variance}</td>
                    </tr>
                    <tr>
                        <td>Standard Deviation</td>
                        <td>{this.state.stdev}</td>
                    </tr>
                    <tr>
                        <td>Mean Deviation</td>
                        <td>{this.state.meandev}</td>
                    </tr>
                    <tr>
                        <td>Median Devation</td>
                        <td>{this.state.meddev}</td>
                    </tr>
                    <tr>
                        <td>Skewness</td>
                        <td>{this.state.skewness}</td>
                    </tr>
                    <tr>
                        <td>Kurtosis</td>
                        <td>{this.state.kurtosis}</td>
                    </tr>
                    <tr>
                        <td>Coeffecient of Variation</td>
                        <td>{this.state.coeffvar}</td>
                    </tr>
                    <tr>
                        <td>Index of Dispersion</td>
                        <td>{this.state.iod}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

});
ReactDOM.render(
    <Content />,
    document.getElementById('content')
);