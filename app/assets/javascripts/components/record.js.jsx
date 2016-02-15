var Record = React.createClass({
  render: function(){
    return(
      <div className="record">
        <p> { this.props.date } | { this.props.title } | { amountFormat(this.props.amount) } </p>
      </div>
    )
  }
})
