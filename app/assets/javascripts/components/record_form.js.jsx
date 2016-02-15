var RecordForm = React.createClass({
  getInitialState: function(){
    return { title: '', date: '', amount: ''}
  },
  handleDateChange: function(e){
    this.setState({date: e.target.value})
  },
  handleTitleChange: function(e){
    this.setState({title: e.target.value})
  },
  handleAmountChange: function(e){
    this.setState({amount: e.target.value})
  },
  valid: function(){
    return this.state.title && this.state.date && this.state.amount
  },
  handleSubmit: function(e){
    e.preventDefault();
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {record: this.state },
      success: function(data){
        console.log("I MADE IT HERE");
        this.props.handleNewRecord(data);
        this.setState({data: data});
        this.getInitialState();
      }.bind(this)
    });
  },
  render: function(){
    return(
      <form className="recordForm" onSubmit={this.handleSubmit} >
        <input type="text" placeholder="Date" value= {this.state.date} onChange= {this.handleDateChange} />
        <input type="text" placeholder="Title" value= {this.state.title} onChange= {this.handleTitleChange} />
        <input type="number" placeholder="Amount" value= {this.state.amount} onChange= {this.handleAmountChange} />
        <input type="submit" disabled={!this.valid()} value="Create Record" />
      </form>
    );
  }
});
