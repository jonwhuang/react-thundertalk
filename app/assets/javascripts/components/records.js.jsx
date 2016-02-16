
var Records = React.createClass({
  // loadRecordsFromServer: function(){
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     cache: false,
  //     success: function(records) {
  //       this.setState({data: records});
  //     }.bind(this),
  //     error: function(xhr, status, error) {
  //       console.error(this.props.url, status, error.toString());
  //     }.bind(this)
  //   });
  // },
  getInitialState: function(){
    return {records: this.props.records};
  },
  // getDefaultProps: function(){
  //   return {records: []}
  // },
  delr: function(recordId) {
    $.ajax({
      method: 'DELETE',
      url: '/records/' + recordId,
      dataType: 'json',
      success: function(records){
        this.replaceState({records: records});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleRecordSubmit: function(record) {
    var records = this.state.records.slice();
    record.id = Date.now();
    $.ajax({
      data: {record: record},
      url: this.props.url,
      type: "POST",
      dataType: 'json',
      success: function(data){
        record.id = data.id;
        records.push(record);
        this.setState({records: records})
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });

  },
  // componentWillUpdate: function(){
  //   console.log("hi");
  //   this.loadRecordsFromServer();
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
            <RecordList del={this.delr} records={ this.state.records } />
            <RecordForm form={ this.state.form } onRecordSubmit={ this.handleRecordSubmit } />
          </div>
        </div>
      </div>
    );
  }
});

var RecordList = React.createClass({
  deleteRecord: function(recordId){
    return this.props.del(recordId);
  },
  render: function(){
    var RecordNodes = this.props.records.map(function(record) {
      return(
        <Record record={record} date={record.date} title={record.title} amount={record.amount} key={record.id} handleDeleteRecord={ this.deleteRecord } ></Record>
      )
    }.bind(this));
    return(
      <div className="record-list">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
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
