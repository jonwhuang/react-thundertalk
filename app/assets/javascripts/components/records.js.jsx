

var Records = React.createClass({
  getInitialState: function(){
    return {records: this.props.data}
  },
  getDefaultProps: function(){
    return {records: []}
  },
  addRecord: function(record){
    var records = this.state.records.slice();
    records.push(record);
    this.setState({records: records});
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
        <RecordForm handleNewRecord={this.addRecord} />
      </div>
    );
  }
})


