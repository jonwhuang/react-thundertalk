var Record = React.createClass({
  handleDelete: function(e){
    e.preventDefault();
    var recordId = this.props.record.id
    $.ajax({
      method: 'DELETE',
      url: '/records/' + recordId,
      dataType: 'json',
      success: function(){
        this.props.handleDeleteRecord(this.props.record);
      }.bind(this),
    });
  },
  render: function(){
    return(
        <tr>
          <td>{ this.props.date }</td>
          <td>{ this.props.title }</td>
          <td>{ amountFormat(this.props.amount) }</td>
          <td className="col-md-2">
            <a className="btn btn-danger" onClick={this.handleDelete} >Delete</a>
          </td>
        </tr>
    )
  }
})
