
var Records = React.createClass({
  loadRecordsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState(data);
      }.bind(this)
    });
  },
  getInitialState: function(){
    return { records: JSON.parse(this.props.records)};
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
    $.ajax({
      data: {record: record},
      url: this.props.url,
      type: "POST",
      dataType: 'json',
      success: function(data){
        this.setState(data);
      }.bind(this)
    });
  },
  componentDidMount: function(){
    this.loadRecordsFromServer();
    setInterval(this.loadRecordsFromServer, this.props.updateInterval);
  },
  render: function(){
    return (
      <div className="record-box">
        <h2 className="title"> Records </h2>
        <RecordList records={ this.state.records } />
        <RecordForm form={ this.state.form } onRecordSubmit={ this.handleRecordSubmit } />
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
        { RecordNodes }
      </div>
    );
  }
});
