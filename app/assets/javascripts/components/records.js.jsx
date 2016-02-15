

var Records = React.createClass({
  getInitialState: function(){
    return {records: this.props.data}
  },
  getDefaultProps: function(){
    return {records: []}
  },
  handleRecordSubmit: function(record){
    // var records = this.state.data;
    // record.id = Date.now();
    // console.log(records);
    // var newRecords = records.concat([record]);
    // this.setState({data: newRecords});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: { record: record },
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        // this.setState({data: records});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
    var RecordNodes = this.props.data.map(function(record) {
      return(
        <Record date={record.date} title={record.title} amount={record.amount} key={record.id}>
        </Record>
      )
    });
    return (
      <div className="records">
        <h2 className="title"> Records </h2>
        <table className="table">
          <thead>
            <tr>
              <th> Date </th>
              <th> Title </th>
              <th> Amount </th>
            </tr>
          </thead>
          <tbody>
            {RecordNodes}
          </tbody>
        </table>
        <RecordForm onRecordSubmit={this.handleRecordSubmit} />
      </div>
    );
  }
})


