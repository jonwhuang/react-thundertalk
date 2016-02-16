var Record = React.createClass({
  render: function(){
    return(
        <tr>
          <td>{ this.props.date }</td>
          <td>{ this.props.title }</td>
          <td>{ amountFormat(this.props.amount) }</td>
        </tr>
    )
  }
})
