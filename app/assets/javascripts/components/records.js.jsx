
var Records = React.createClass({
  // loadRecordsFromServer: function(){
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     cache: false,
  //     success: function(data) {
  //       this.setState({records: data});
  //     }.bind(this),
  //     error: function(xhr, status, error) {
  //       console.error(this.props.url, status, error.toString());
  //     }.bind(this)
  //   });
  // },
  getInitialState: function(){
    return {records: JSON.parse(this.props.records)};
  },
  // getDefaultProps: function(){
  //   return {records: []}
  // },
  // addRecord: function(record){
  //   var records = this.state.records.slice();
  //   records.push(record);
  //   this.setState({records: records});
  // },
  handleRecordSubmit: function(record) {
    var records = this.state.records.slice();
    record.id = Date.now();
    records.push(record);
    this.setState({records: records}, function(){
      $.ajax({
        data: {record: record},
        url: this.props.url,
        type: "POST",
        dataType: 'json',
        success: function(data){
          this.setState(data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(this.props.url, status, err.toString());
        }.bind(this)
      });
    })
  },
  // componentDidMount: function(){
  //   this.loadRecordsFromServer();
  //   this.loadInterval = setInterval(this.loadRecordsFromServer, this.props.updateInterval);
  // },
  // componentWillUnmount: function() {
  //   this.loadInterval && clearInterval(this.loadInterval);
  //   this.loadInterval = false;
  // },
  credits: function(){
    var credits;
    credits = this.state.records.filter(function(record){
      return record.amount >= 0;
    });
    return(
      credits.reduce((function(sum, record){
        return sum + parseFloat(record.amount)
      }), 0)
    );
  },
  debits: function(){
    var debits;
    debits = this.state.records.filter(function(record){
      return record.amount < 0;
    });
    return(
      debits.reduce((function(sum, record){
        return sum + parseFloat(record.amount)
      }), 0)
    );
  },
  balance: function(){
    return (this.credits() + this.debits());
  },
  render: function(){
    return (
      <div className="container">
        <div className="col-md-8">
          <div className="record-box">
            <h2 className="title"> Records </h2>
            <div className = "row">
              <AmountBox type="panel panel-success" amount={this.credits()} text="Credit" />
              <AmountBox type="panel panel-danger" amount={this.debits()} text="Debit" />
              <AmountBox type="panel panel-info" amount={this.balance()} text="Balance" />
            </div>
            <RecordList records={ this.state.records } />
            <RecordForm form={ this.state.form } onRecordSubmit={ this.handleRecordSubmit } />
          </div>
        </div>
      </div>
    );
  }
});

var RecordList = React.createClass({
  render: function(){
    var RecordNodes = this.props.records.map(function(record) {
      return(
        <Record date={record.date} title={record.title} amount={record.amount} key={record.id}></Record>
      )
    });
    return(
      <div className="record-list">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            { RecordNodes }
          </tbody>
        </table>
      </div>
    );
  }
});
